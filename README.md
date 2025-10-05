# 🚀 Space Biology Discovery Engine

**A Unified Research Platform for NASA OSDR Data and Literature**

---

## 🛰️ Project Summary

The **Space Biology Discovery Engine** is a critical research tool developed during the NASA Space Apps Challenge to solve the problem of fragmented data within space biology. We built a unified platform that directly interfaces with the **NASA Open Science Data Repository (OSDR)**, allowing scientists to efficiently search and connect peer-reviewed journal literature with the raw OSDR datasets. By offering intuitive, cross-source filtering capabilities, we help researchers rapidly match publications to the underlying spaceflight experiments. This platform accelerates the process of data discovery, turning vast amounts of public NASA data into actionable scientific knowledge to support future human space exploration.

---

## ✨ Features

- **Live OSDR Integration:** Access and load thousands of records directly from the NASA Open Science Data Repository via its public API.
- **Unified Search Interface:** A single search bar and advanced filters allow researchers to query both literature and dataset metadata simultaneously.
- **Match Identification:** Facilitates the easy discovery of the link between a published research paper and the specific OSDR experiment data it describes.
- **Dark Mode / Light Mode:** User-friendly interface with customizable theme settings for optimal viewing.

---

## 🛠️ Technology Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **React.js** | Modular, fast user interface development. |
| **Styling** | **Tailwind CSS** | Utility-first framework for rapid, responsive, and dynamic styling (including the 3D-like space design). |
| **State Management** | **React Hooks** | Simple, efficient state and side effect management. |
| **Data Fetching** | **JavaScript's native `fetch` or Axios** | Handling asynchronous API calls to the NASA OSDR. |
| **Routing** | **React Router DOM** | Manages client-side routing for seamless navigation. |

---

## 🌐 Installation and Setup

To get a local copy up and running, follow these simple steps.

### Prerequisites

1.  **Node.js** (LTS version recommended)
2.  **npm** or **Yarn**

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/jxcorp/nasa-bio-knowledge-engine.git
    cd nasa-bio-knowledge-engine
    ```
2.  Install dependencies:
    ```bash
    npm install 
    # or
    yarn install
    ```
3.  Place your rotating Earth video in the public folder:
    ```bash
    # Ensure you have the video file at:
    /public/earth_rotating.mp4
    ```
4.  Run the development server:
    ```bash
    npm start
    # or
    yarn start
    ```
    The application will typically open in your browser at `http://localhost:3000`.

---


## 👨‍🚀 Team

| Name | Role |
| :--- | :--- |
| [Jeremia Xavier] | [Developer] |
| [Abhinav Sajeev] | [QA] |
| [Nithina M P] | [UI/UX] |
| [Umesh S] | [Researcher] |
| [Tejas] | [Developer] |
| [Adon Renji] | [QA] |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
