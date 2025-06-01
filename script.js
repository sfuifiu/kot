// Toggle menu dropdown
function toggleMenu() {
  const dropdown = document.getElementById('menu-dropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Close menu if clicked outside
window.onclick = function (event) {
  if (!event.target.matches('.menu-button')) {
    const dropdown = document.getElementById('menu-dropdown');
    if (dropdown && dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
    }
  }
};

// Show About section
function toggleAbout() {
  const aboutSection = document.getElementById('about-section');
  aboutSection.style.display = aboutSection.style.display === 'block' ? 'none' : 'block';
}

// Fetch data from ThingSpeak
function fetchThingSpeakData() {
  const apiUrl = 'https://api.thingspeak.com/channels/2903850/feeds.json?api_key=E1HRIMYWBE6I6VTE&results=100';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const turbidity = data.feeds[0].field1;
      const temperature = data.feeds[0].field2;
      const tds = parseFloat(data.feeds[0].field3).toFixed(2);

      document.getElementById('turbidity').textContent = `${turbidity} NTU`;
      document.getElementById('temperature').textContent = `${temperature}°C`;
      document.getElementById('tds').textContent = `${tds} ppm`;
    })
    .catch(error => {
      console.error('Error fetching data from ThingSpeak:', error);
      document.getElementById('turbidity').textContent = 'Error';
      document.getElementById('temperature').textContent = 'Error';
      document.getElementById('tds').textContent = 'Error';
    });
}

// Update every 60 seconds
setInterval(fetchThingSpeakData, 60000);
fetchThingSpeakData();
