import pathlib

import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(page_title="TechLynx 2026 | Future Tech Symposium", page_icon="TL", layout="wide")


def load_site_html() -> str:
    base_dir = pathlib.Path(__file__).resolve().parent
    html_path = base_dir / "src" / "index.html"
    css_path = base_dir / "style.css"
    js_path = base_dir / "script.js"

    html = html_path.read_text(encoding="utf-8")
    css = css_path.read_text(encoding="utf-8")
    js = js_path.read_text(encoding="utf-8")

    html = html.replace('<link rel="stylesheet" href="./style.css" />', "<style>\n" + css + "\n</style>")
    html = html.replace('<script src="./script.js"></script>', "<script>\n" + js + "\n</script>")
    return html


try:
    site_html = load_site_html()
    components.html(site_html, height=1100, scrolling=True)
except Exception as exc:
    st.error("Unable to load the site HTML. Check that src/index.html, style.css, and script.js exist.")
    st.exception(exc)
