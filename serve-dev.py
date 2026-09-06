#!/usr/bin/env python3
"""Local dev server with no-cache headers for Safari-friendly reloads."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4174
FOOTBALL_DATA_PREFIX = "/api/football-data"
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))


def load_env_local():
    env_path = os.path.join(ROOT_DIR, ".env.local")
    if not os.path.isfile(env_path):
        return

    with open(env_path, encoding="utf-8") as env_file:
        for line in env_file:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = value


load_env_local()
FOOTBALL_DATA_TOKEN = os.environ.get("FOOTBALL_DATA_API_TOKEN", "").strip()


class NoCacheHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".mov": "video/quicktime",
        ".mp4": "video/mp4",
        ".m4v": "video/mp4",
    }

    def do_GET(self):
        if self.path.startswith(FOOTBALL_DATA_PREFIX):
            self._proxy_football_data()
            return

        parsed = urllib.parse.urlparse(self.path)
        fs_path = os.path.join(ROOT_DIR, parsed.path.lstrip("/"))
        basename = os.path.basename(parsed.path)
        if parsed.path not in ("/", "/index.html") and not os.path.exists(fs_path):
            if "." not in basename:
                self.path = "/index.html"

        super().do_GET()

    def _proxy_football_data(self):
        if not FOOTBALL_DATA_TOKEN:
            self._send_json(
                503,
                {
                    "error": (
                        "Missing API token. Add FOOTBALL_DATA_API_TOKEN=your_key to "
                        ".env.local in the project root, then restart the server."
                    ),
                },
            )
            return

        upstream_path = self.path[len(FOOTBALL_DATA_PREFIX) :] or "/"
        upstream_url = f"https://api.football-data.org{upstream_path}"
        request = urllib.request.Request(
            upstream_url,
            headers={"X-Auth-Token": FOOTBALL_DATA_TOKEN},
            method="GET",
        )

        try:
            with urllib.request.urlopen(request, timeout=12) as response:
                body = response.read()
                self.send_response(response.status)
                self.send_header(
                    "Content-Type",
                    response.headers.get("Content-Type", "application/json"),
                )
                self.send_header("Cache-Control", "no-store")
                self.end_headers()
                self.wfile.write(body)
        except urllib.error.HTTPError as error:
            body = error.read()
            self.send_response(error.code)
            self.send_header(
                "Content-Type",
                error.headers.get("Content-Type", "application/json"),
            )
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)
        except Exception as error:
            self._send_json(502, {"error": str(error)})

    def _send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    os.chdir(ROOT_DIR)
    server = ThreadingHTTPServer(("", PORT), NoCacheHandler)
    token_state = "configured" if FOOTBALL_DATA_TOKEN else "missing"
    print(f"Serving at http://localhost:{PORT} (no-cache, football-data token {token_state})")
    if token_state == "missing":
        print("Create .env.local with FOOTBALL_DATA_API_TOKEN=your_key for live football data.")
    server.serve_forever()
