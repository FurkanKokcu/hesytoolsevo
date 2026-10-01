# Hesy Tools 🦷

An open-source, web-based clinical decision support tool that gathers frequently needed information and calculations in dental practice into a single interface. Designed to accelerate complex processes and provide access to practical information in seconds.

## 🌟 Features

*   **Periodontal Calculators:** 2017 Periodontal Classification and Gingival Index (Löe & Silness) calculations.
*   **Consultation Wizard:** Rapid consultation text generation based on the patient's systemic condition and medications.
*   **Trauma Protocol:** A step-by-step emergency intervention wizard based on current guidelines for avulsion, luxation, and fracture cases.
*   **Ready Prescription Templates:** Quick prescription references for common post-op infections, myalgia, and prophylaxis (adapted to US Rx standards).
*   **Hematological Risk Analysis:** Dental procedure risk assessment based on INR, Hemoglobin, HbA1c, and Blood Pressure values.
*   **Pediatric Prophylaxis Calculator:** Prophylactic antibiotic dose calculation in milligrams based on the child's weight, allergy status, and route of administration.
*   **Herbst Tests:** Sequential muscle and frenum check steps for the upper and lower jaw during removable prosthesis impressions and try-ins.

## 📂 Project Structure

The project features a multi-language architecture. The core files are separated into language-specific directories:

*   `/en/` - English version of the application.
*   `/tr/` - Turkish version of the application.

## 🛠️ Technologies Used

Hesy Tools is a static web application running entirely on the client-side:
*   **HTML5 & CSS3**
*   **JavaScript (ES6+)**
*   **Alpine.js:** For lightweight, reactive data management and state control.
*   **Bootstrap 5.3:** For a modern, responsive interface with built-in dark/light theme support.

## 🚀 Installation & Usage

Since the application consists of static files, it does not require any server setup or database.

1.  Clone the repository:
    ```bash
    git clone [https://github.com/FurkanKokcu/hesy-tools.git](https://github.com/FurkanKokcu/hesy-tools.git)
    ```
2.  Navigate to your preferred language folder (`/en/` or `/tr/`).
3.  Open the `index.html` file in any modern web browser.
4.  For development, you can use a local server (e.g., *Live Server* extension in Codium/VS Code) to test real-time changes.

> **Note:** Being a fully static project, it is perfectly suited for direct hosting on platforms like GitHub Pages or Cloudflare Pages.

## ⚠️ Disclaimer

**Hesy Tools** is an assistant tool developed to support dental practice. The hematological analyses, drug dosages, and treatment protocols provided here are purely for reference purposes. It is solely the physician's responsibility to verify the accuracy of the information, the specific condition of the patient, and current medical guidelines before making a final medical decision.

## ⚖️ License

This project is open-sourced under the **GNU GPLv3** (General Public License v3.0). You are free to copy, modify, and distribute the code. For the full text of the license, please visit the [GNU website](https://www.gnu.org/licenses/gpl-3.0.html).