import json
import os
from datetime import datetime
from urllib import request, error

import streamlit as st

st.set_page_config(page_title="CSI CSE AI&ML Symposium Registration", page_icon="??", layout="centered")

st.title("CSI CSE AI&ML Symposium Registration")
st.caption("Department: CSE - Artificial Intelligence and Machine Learning | CSI College of Engineering")

script_url_default = os.getenv("GOOGLE_SCRIPT_URL", "")
script_url = st.text_input("Google Apps Script Web App URL (/exec)", value=script_url_default)

with st.form("registration_form"):
    full_name = st.text_input("Full Name")
    college_name = st.text_input("College Name", value="CSI College of Engineering")
    department = st.text_input("Department", value="CSE - Artificial Intelligence and Machine Learning")
    email = st.text_input("Email")
    phone = st.text_input("Phone Number")
    event_selected = st.selectbox("Event Selected", ["Paper Presentation", "Project Expo", "AI Quiz", "Hackathon"])
    payment_status = st.selectbox("Payment Status", ["Pending", "Paid"])

    submitted = st.form_submit_button("Submit Registration")

if submitted:
    if not script_url.strip():
        st.error("Please provide your Google Apps Script URL.")
    elif not full_name.strip() or not email.strip() or not phone.strip():
        st.error("Full Name, Email, and Phone Number are required.")
    else:
        payload = {
            "fullName": full_name.strip(),
            "collegeName": college_name.strip(),
            "department": department.strip(),
            "email": email.strip(),
            "phone": phone.strip(),
            "eventSelected": event_selected,
            "paymentStatus": payment_status,
            "submittedAt": datetime.utcnow().isoformat() + "Z",
        }

        req = request.Request(
            script_url.strip(),
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "text/plain;charset=utf-8"},
            method="POST",
        )

        try:
            with request.urlopen(req, timeout=20) as resp:
                body = resp.read().decode("utf-8")
                try:
                    result = json.loads(body)
                except json.JSONDecodeError:
                    result = {"success": True, "raw": body}

                if result.get("success", True):
                    st.success("Registration submitted successfully.")
                else:
                    st.error(result.get("message", "Submission failed."))
        except error.HTTPError as exc:
            st.error(f"HTTP error: {exc.code}")
        except error.URLError as exc:
            st.error(f"Network error: {exc.reason}")
        except Exception as exc:  # pragma: no cover
            st.error(f"Unexpected error: {exc}")
