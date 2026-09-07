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
        ".otf": "font/otf",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
    }

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        request_path = parsed.path
        if request_path in ("/favicon.ico", "/favicon.svg"):
            request_path = "/assets/favicon.svg"
            self.path = request_path

        fs_path = os.path.join(ROOT_DIR, request_path.lstrip("/"))
        basename = os.path.basename(request_path)
        if request_path not in ("/", "/index.html") and not os.path.exists(fs_path):
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
