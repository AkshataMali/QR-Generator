const fs = require('fs');

// Function to generate random text
function generateRandomText(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to fetch QR code URL from API
async function fetchQRCodeURL(data) {
    try {
        return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data)}`;
    } catch (error) {
        console.error('Error fetching QR code URL:', error);
        return null;
    }
}

// Function to append text and QR code URL to README.md table
async function appendToReadmeTable(text) {
    try {
        const qrCodeURL = await fetchQRCodeURL(text);
        if (!qrCodeURL) return;

        const tableRow = `| ${text} | ![QR Code](${qrCodeURL}) |`;

        fs.appendFileSync('README.md', `${tableRow}\n`);
        console.log('README.md updated successfully with new table row!');
    } catch (error) {
        console.error('Error updating README.md:', error);
    }
}

// Main function
async function main() {
    const randomText = generateRandomText(10); // Generate random text
    const tableHeader = '| Code | QR Code |\n|------|---------|';
    fs.writeFileSync('README.md', tableHeader + '\n');
    await appendToReadmeTable(randomText);
}

main();