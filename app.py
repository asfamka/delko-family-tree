
# example 2
# import streamlit as st
#
# st.title("Delko family Profile Form")
#
# # Initialize session state for confirmation
# if 'delko_confirmed' not in st.session_state:
#     st.session_state.delko_confirmed = False
#
# # Step 1: Ask if they are Delko's family
# if not st.session_state.delko_confirmed:
#     with st.form("our_profile_form"):
#         Delko_check = st.text_input("Are you Delko's family?")
#         yes = st.form_submit_button("Yes")
#         no = st.form_submit_button("No")
#
#     if yes:
#         st.session_state.delko_confirmed = True
#         st.success(" Profile confirmed")
#     elif no:
#         st.warning("You are not allowed to continue ❌")
# # Step 2: Only show profile form if confirmed
# if st.session_state.delko_confirmed:
#     with st.form("profile_form"):
#         name = st.text_input("Enter your full name")
#         age = st.number_input("Enter your age", min_value=30, max_value=120)
#         bio = st.text_area("Write a short bio about yourself")
#         submitted = st.form_submit_button("Confirm")
#
#     if submitted:
#         st.success("Profile Saved ✅")
#         st.write(f"**Your Name:** {name}")
#         st.write(f"**Your Age:** {age}")
#         st.write(f"**Your Bio:** {bio}")
#         # st.write(bio)

#example 3
#  import streamlit as st
# #
#  st.title("Delko Family Data Record")
# # #
# # # --- Family data (nested dictionary) ---
#  family_data = {
#     "Oumer": {
#          "description": "Oumer is the eldest in the mother Nurseba. he lived his life in Adiss Abeba and died in 1992 may Alah keep him in paradise .",
#          "children": {
#              "Ammar": {
#                  "description": "Ammar is the first and the only sone of oumer. hi is liuving in Australia now",
#                  "children": {
#                      "Grandchild1": {
#                          "description": "Grandchild of Oumer through Child1.",
#                          "children": {}
#                      }
#                  }
#              },
#              "Child2": {
#                  "description": "Second child of Oumer.",
#                  "children": {}
#              }
#          }
#     },
#     "Ayro": {
#         "description": "Ayro is caring and always supports the family.",
#         "children": {
#             "ChildA": {
#                 "description": "Child of Ayro.",
#                 "children": {}
#             }
#         }
#     },
#     "Reshad": {
#         "description": "Reshad is adventurous and energetic.",
#         "children": {}
#     },
#     "Selima": {
#         "description": "Selima is kind and artistic.",
#         "children": {}
#     },
#     "Fetitya": {
#         "description": "Fetitya is known for her generosity.",
#         "children": {}
#     },
#     "Ali": {
#         "description": "Ali is hardworking and determined.",
#         "children": {}
#     },
#     "Neja": {
#         "description": "Neja is the youngest, curious and bright.",
#         "children": {}
#     }
# }
#
# # --- Recursive function to display family tree ---
# def display_family(name, data):
#     with st.expander(name, expanded=False):
#         st.write(data["description"])
#         if data["children"]:
#             st.subheader(f"Children of {name}:")
#             for child, child_data in data["children"].items():
#                 display_family(child, child_data)
#
# # --- Step 1: Confirm Family Membership ---
# if 'delko_confirmed' not in st.session_state:
#     st.session_state.delko_confirmed = False
#
# if not st.session_state.delko_confirmed:
#     with st.form("family_check_form"):
#         check = st.text_input("Are you Delko's family?")
#         yes = st.form_submit_button("Yes")
#         no = st.form_submit_button("No")
#
#     if yes:
#         st.session_state.delko_confirmed = True
#         st.success("Welcome to the Delko Family Records ✅")
#     elif no:
#         st.warning("Access Denied ❌")
#
# # --- Step 2: Show family tree if confirmed ---
# if st.session_state.delko_confirmed:
#     st.header("Delko Family Members")
#     for member, data in family_data.items():
#         display_family(member, data)
# #


# example 4



#
# import streamlit as st
#
# st.title("Delko Family Data Record")
#
# # --- Initialize family data in session_state ---
# if "family_data" not in st.session_state :
#     st.session_state.family_data = {
#         "Oumer" : {
#             "description" : "Oumer is the eldest in the family, known for his wisdom.",
#             "children" : { }
#         },
#         "Ayro" : {
#             "description" : "Ayro is caring and always supports the family.",
#             "children" : { }
#         },
#         "Reshad" : {
#             "description" : "Reshad is adventurous and energetic.",
#             "children" : { }
#         },
#         "Selima" : {
#             "description" : "Selima is kind and artistic.",
#             "children" : { }
#         },
#         "Fetitya" : {
#             "description" : "Fetitya is known for her generosity.",
#             "children" : { }
#         },
#         "Ali" : {
#             "description" : "Ali is hardworking and determined.",
#             "children" : { }
#         },
#         "Neja" : {
#             "description" : "Neja is the youngest, curious and bright.",
#             "children" : { }
#         }
#     }
#
#
# # --- Recursive function to display family tree ---
# def display_family(name, data, path) :
#     with st.expander(name, expanded = False) :
#         st.write(data["description"])
#
#         # --- Form to add a new child ---
#         with st.form(f"add_child_form_{path}") :
#             new_child_name = st.text_input(f"Add a child to {name}", key = f"name_{path}")
#             new_child_desc = st.text_area("Description", key = f"desc_{path}")
#             add_child = st.form_submit_button("Add Child")
#
#         if add_child and new_child_name.strip() :
#             # Navigate through session_state dict using the path
#             node = st.session_state.family_data
#             for p in path :
#                 node = node[p]["children"]
#             node[new_child_name] = { "description" : new_child_desc, "children" : { } }
#             st.success(f"Child '{new_child_name}' added to {name} fasmily")
#
#         # --- Show children if any ---
#         if data["children"] :
#             st.subheader(f"Children of {name}:")
#             for child, child_data in data["children"].items() :
#                 display_family(child, child_data, path + [child])
#
#
# # --- Step 1: Confirm Family Membership ---
# if "delko_confirmed" not in st.session_state :
#     st.session_state.delko_confirmed = False
#
# if not st.session_state.delko_confirmed :
#     with st.form("family_check_form") :
#         check = st.text_input("Are you Delko's family?")
#         yes = st.form_submit_button("Yes")
#         no = st.form_submit_button("No")
#
#     if yes :
#         st.session_state.delko_confirmed = True
#         st.success("Welcome to the Delko Family Records ✅")
#     elif no :
#         st.warning("Access Denied ❌")
#
# # --- Step 2: Show family tree if confirmed ---
# if st.session_state.delko_confirmed :
#     st.header("Delko Family Members")
#     for member, data in st.session_state.family_data.items() :
#         display_family(member, data, [member])
#
#





#example5



# --- Initialize open forms and expanded state ---
# app.py - Final Delko Family Tree (merge-safe, quiz fixed, ordered first generation)
import streamlit as st
import os
import json
import random
from datetime import datetime

st.set_page_config(page_title="Delko Family Tree", page_icon="🌳", layout="wide")

# -----------------------------
# Constants and files
# -----------------------------
FIRST_GEN = [
    "Oumer Mohammed",
    "Sefo Mohammed",
    "Ayro Mohammed",
    "Reshad Mohammed",
    "Selima Mohammed",
    "Fetiya Mohammed",
    "Ali Mohammed",
    "Neja Mohammed",
]

DATA_FILE = "family_data.json"
HISTORY_FILE = "family_history.json"


# -----------------------------
# Load/save functions
# -----------------------------
def load_data():
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r") as f:
                return json.load(f)
        except:
            st.warning("Family data corrupted. Starting fresh.")
    return {name: {"description": "", "phone": "", "photo": None, "children": {}} for name in FIRST_GEN}


def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)


def log_history(action, path, name):
    entry = {"timestamp": str(datetime.now()), "action": action, "path": path, "name": name}
    history = []
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, "r") as f:
                history = json.load(f)
        except:
            history = []
    history.append(entry)
    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=4)


# -----------------------------
# Session state
# -----------------------------
if "family_data" not in st.session_state:
    st.session_state.family_data = load_data()
if "open_forms" not in st.session_state:
    st.session_state.open_forms = {}
if "edit_forms" not in st.session_state:
    st.session_state.edit_forms = {}
if "delko_confirmed" not in st.session_state:
    st.session_state.delko_confirmed = False
if "expanded_nodes" not in st.session_state:
    st.session_state.expanded_nodes = {}

# -----------------------------
# Family quiz
# -----------------------------
QUIZ = {
    "Who is the eldest in the family?": "Oumer",
    "Who is the father of Mekiya?": "Reshad",
    "Who is the father of Imran?": "Ali",
}

if not st.session_state.delko_confirmed:
    if "quiz_q" not in st.session_state:
        st.session_state.quiz_q = random.choice(list(QUIZ.keys()))
    with st.form("quiz_login"):
        st.subheader("🔐 Family Quiz Login")
        st.write(st.session_state.quiz_q)
        answer = st.text_input("Your Answer")
        confirm = st.form_submit_button("Confirm")
    if confirm:
        if answer.strip().lower() == QUIZ[st.session_state.quiz_q].lower():
            st.session_state.delko_confirmed = True
            st.success("✅ Correct! Welcome to the Delko family tree")
            st.rerun()
        else:
            st.error("❌ Wrong answer. Try again.")
            st.session_state.quiz_q = random.choice(list(QUIZ.keys()))


# -----------------------------
# Helpers
# -----------------------------
def get_image(photo):
    if photo is None:
        return "https://via.placeholder.com/200"
    if isinstance(photo, str) and os.path.exists(photo):
        return photo
    if isinstance(photo, str) and photo.startswith("http"):
        return photo
    return "https://via.placeholder.com/200"


def add_child(parent, path, name, desc, phone, photo):
    if photo:
        os.makedirs("photos", exist_ok=True)
        file_path = os.path.join("photos", photo.name)
        with open(file_path, "wb") as f:
            f.write(photo.getbuffer())
    else:
        file_path = None
    parent["children"][name] = {"description": desc, "phone": phone, "photo": file_path, "children": {}}
    save_data(st.session_state.family_data)
    log_history("Add", path, name)


def edit_member(node, path, name, desc, phone, photo):
    node["description"] = desc
    node["phone"] = phone
    if photo:
        os.makedirs("photos", exist_ok=True)
        file_path = os.path.join("photos", photo.name)
        with open(file_path, "wb") as f:
            f.write(photo.getbuffer())
        node["photo"] = file_path
    save_data(st.session_state.family_data)
    log_history("Edit", path, name)


def delete_member(parent, child_name, path):
    parent["children"].pop(child_name, None)
    save_data(st.session_state.family_data)
    log_history("Delete", path, child_name)


# -----------------------------
# Display family recursively
# -----------------------------
def display_family(name, node, path, level=0):
    color_map = {
        0: "#C8E6C9",  # Soft Green
        1: "#FFF9C4",  # Soft Yellow
        2: "#B3E5FC",  # Soft Blue
        3: "#FFE0B2",  # Soft Orange
        4: "#F8BBD0",  # Soft Pink
    }
    bg_color = color_map.get(level, "#E0E0E0")

    gen_labels = ["Son", "Grandson", "Great-grandson", "Great-great-grandson", "Next Gen"]
    gen_text = gen_labels[level] if level < len(gen_labels) else "Descendant"

    indent = level * 50
    key_path = "_".join(path)

    with st.container():
        st.markdown(
            f"""
        <div style='
            margin-left:{indent}px;
            padding:20px;
            border-radius:20px;
            margin-bottom:10px;
            background-color:{bg_color};
            border:1px solid #999;
            box-shadow: 3px 3px 10px rgba(0,0,0,0.2);
        '>
        """,
            unsafe_allow_html=True,
        )

        col1, col2, col3 = st.columns([2, 5, 1])
        with col1:
            st.image(get_image(node.get("photo")), width=180, caption=name)
        with col2:
            st.markdown(f"## 👤 {name}")
            st.markdown(f"**Generation:** {gen_text}")
            st.write(node.get("description", ""))
            if node.get("phone"):
                st.markdown(f"📞 [Call {node['phone']}](tel:{node['phone']})")
        with col3:
            btn_text = "Colaps ▼    " if st.session_state.expanded_nodes.get(key_path, False) else "Expand to childs  ▶     "
            if st.button(btn_text, key=f"explore_{key_path}"):
                st.session_state.expanded_nodes[key_path] = not st.session_state.expanded_nodes.get(key_path, False)
                st.rerun()

            if st.button("✏️", key=f"edit_{key_path}"):
                st.session_state.edit_forms[key_path] = True
                st.rerun()
            if st.button("🗑", key=f"del_{key_path}"):
                parent_node = st.session_state.family_data
                git - -version
                for p in path[:-1]:
                    parent_node = parent_node[p]["children"]
                delete_member(parent_node, name, path)
                st.rerun()

        if st.session_state.edit_forms.get(key_path, False):
            with st.form(f"form_edit_{key_path}"):
                new_name = st.text_input("Name", value=name)
                desc = st.text_area("Description", value=node.get("description", ""))
                phone = st.text_input("Phone", value=node.get("phone", ""))
                photo = st.file_uploader("Photo", type=["jpg", "png", "jpeg"])
                submitted = st.form_submit_button("Save")
                if submitted:
                    edit_member(node, path, new_name, desc, phone, photo)
                    st.session_state.edit_forms[key_path] = False
                    st.rerun()

        if st.session_state.expanded_nodes.get(key_path, False):
            for child_name, child_node in node.get("children", {}).items():
                display_family(child_name, child_node, path + [child_name], level=level + 1)

            add_key = "add_" + "_".join(path)
            if not st.session_state.open_forms.get(add_key, False):
                if st.button("➕ Add Child", key=f"btn_{add_key}"):
                    st.session_state.open_forms[add_key] = True
                    st.rerun()
            else:
                with st.form(f"form_add_{add_key}"):
                    child_name = st.text_input("Child Name", key=f"name_{add_key}")
                    desc = st.text_area("Description", key=f"desc_{add_key}")
                    phone = st.text_input("Phone", key=f"phone_{add_key}")
                    photo = st.file_uploader("Upload Photo", type=["jpg", "png", "jpeg"], key=f"photo_{add_key}")
                    submitted = st.form_submit_button("Submit")
                    if submitted and child_name.strip():
                        add_child(node, path, child_name, desc, phone, photo)
                        st.session_state.open_forms[add_key] = False
                        st.success(f"✅ Child '{child_name}' added")
                        st.rerun()
        st.markdown("</div>", unsafe_allow_html=True)


# -----------------------------
# Main
# -----------------------------
st.title("🌳 Delko Family Tree")
if st.session_state.delko_confirmed:
    for member_name in FIRST_GEN:
        member_data = st.session_state.family_data.get(member_name)
        if member_data:
            if member_name not in st.session_state.expanded_nodes:
                st.session_state.expanded_nodes[member_name] = False
            display_family(member_name, member_data, [member_name], level=0)
