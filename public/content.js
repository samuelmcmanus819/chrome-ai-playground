// Function to request summarization from the background script
const requestSummary = (text) => {
    chrome.runtime.sendMessage({ action: 'tldr', text }, (response) => {
        if (response && response.rewrite) {
            console.log('Summary:', response.rewrite);
            // You can handle the summary here
        }
    });
}

const requestEli5 = (text) => {
    chrome.runtime.sendMessage({ action: 'eli5', text }, (response) => {
        if (response && response.rewrite) {
            console.log('Summary:', response.rewrite);
            // You can handle the summary here
        }
    });
}


// Example call to the function
requestSummary("All APIs are customizable during their create() calls, with various options. These are given in more detail in the Full API surface in Web IDL section. However, not all models will necessarily support every option value. Or if they do, it might require a download to get the appropriate fine-tuning or other collateral necessary. Similarly, an API might not be supported at all, or might require a download on the first use.");
requestEli5("The implementation of a zero-trust architecture involves micro-segmentation across hybrid cloud environments, leveraging identity-based policies with just-in-time access and least privilege enforcement to minimize the lateral movement of adversaries. This requires integrating machine learning models to dynamically analyze network flow telemetry, anomalous user behavior, and endpoint security metrics in real-time for threat detection and risk scoring. To maintain cryptographic security under FIPS 140-2 and 140-3 compliance, systems must dynamically rotate encryption keys while ensuring compatibility with legacy PKCS#11 HSMs, often necessitating custom cryptographic libraries that support multi-cloud key orchestration.")