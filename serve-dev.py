#!/usr/bin/env python3
"""Local dev server with no-cache headers for Safari-friendly reloads."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os
import sys
import urllib.parse

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))


class NoCacheHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".mov": "video/quicktime",
        ".mp4": "video/mp4",
        ".m4v": "video/mp4",
        ".svg": "image/svg+xml",
    }

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        fs_path = os.path.join(ROOT_DIR, parsed.path.lstrip("/"))
        basename = os.path.basename(parsed.path)
        if parsed.path not in ("/", "/index.html") and not os.path.exists(fs_path):
            if "." not in basename:
                self.path = "/index.html"

        super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    os.chdir(ROOT_DIR)
    server = ThreadingHTTPServer(("", PORT), NoCacheHandler)
    print(f"Serving Sessions Design System at http://localhost:{PORT}")
    server.serve_forever()
