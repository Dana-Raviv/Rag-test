// Function to perform the search
async function performSearch() {
    debugger;
    const query = document.getElementById('searchQuery').value;

    if (!query) {
        alert("Please enter a search query");
        return;
    }

    const loader = document.querySelector('.loader-container');
    const homeView = document.querySelector('.home-view-container');
    const resultsDiv = document.getElementById('results');
    loader.style.display = 'block'; // Show loader
    homeView.style.display = 'none'; // Show loader
    resultsDiv.innerHTML = ''; // Clear previous results

    try {
        // Make a POST request to the backend server (HTTPS)
        // const response = await fetch('http://127.0.0.1:8000/kmedia/smart-search', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ subject: query, top_n: 5 }) // Adjust 'top_n' based on requirements
        // });

        // Check if the response is OK
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }

        // let data = await response.json();
        let data = JSON.parse("[{\"start_time_in_seconds\": 0, \"end_time_in_seconds\": 180, \"description\": \"Julian explains how to break down feature requests using the Golden Circle framework (why, how, what) from the customer's perspective. He emphasizes the importance of understanding the customer's business objective and user experience when evaluating feature requests.\", \"entry_id\": \"1_uiouzdm6\"}, {\"start_time_in_seconds\": 600, \"end_time_in_seconds\": 780, \"description\": \"Discussion on the importance of asking customers directly about their needs, rather than making assumptions. The team talks about translating vague customer requests into clear business objectives that product teams can understand and act on.\", \"entry_id\": \"1_uiouzdm6\"}, {\"start_time_in_seconds\": 780, \"end_time_in_seconds\": 960, \"description\": \"The team discusses challenges in getting complete information from customers, especially when dealing with platform owners rather than end users. They emphasize the importance of educating points of contact to gather more detailed information about feature requests.\", \"entry_id\": \"1_uiouzdm6\"}, {\"start_time_in_seconds\": 0, \"end_time_in_seconds\": 180, \"description\": \"Russ explains the Kaltura health assessment service - what it is, what it covers, and how it provides value to customers through consultative review and recommendations for improving their Kaltura implementation.\", \"entry_id\": \"1_s8ledose\"}, {\"start_time_in_seconds\": 2874, \"end_time_in_seconds\": 3054, \"description\": \"Julian summarizes the key factors that help feature requests get approved: properly structured descriptions, opportunity information, multiple interested customers, potential to affect all customers, and alignment with product strategy.\", \"entry_id\": \"1_ozvonxgu\"}, {\"start_time_in_seconds\": 3319, \"end_time_in_seconds\": 3499, \"description\": \"Julian provides tips for writing better feature requests, including using AI tools like ChatGPT to help structure the request, adding visuals like images and videos, and focusing on the customer's business problem rather than just the technical solution.\", \"entry_id\": \"1_ozvonxgu\"}, {\"start_time_in_seconds\": 3499, \"end_time_in_seconds\": 3679, \"description\": \"Julian emphasizes the importance of the 'feature request golden circle' - starting with why (customer's purpose and business objectives), then how (user experience), and finally what (technical details). He stresses that the first two are most important.\", \"entry_id\": \"1_ozvonxgu\"}, {\"start_time_in_seconds\": 2930, \"end_time_in_seconds\": 3090, \"description\": \"David explains that Caltura Studio helps financial advisors communicate with customers in a regulated industry by providing workflow and script creation capabilities\", \"entry_id\": \"1_54unjkdj\"}, {\"start_time_in_seconds\": 3439, \"end_time_in_seconds\": 3599, \"description\": \"David compares Caltura Studio to a combination of MediaSpace and Pitch, with more sophisticated workflow and script creation for regulated industries\", \"entry_id\": \"1_54unjkdj\"}, {\"start_time_in_seconds\": 3557, \"end_time_in_seconds\": 3717, \"description\": \"David discusses how Caltura Studio provides two levels of demos - a quick executive overview and a more in-depth technical demo\", \"entry_id\": \"1_54unjkdj\"}]");


        // data = JSON.parse(data);

        displayResults(data);

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    } finally {
        // Hide the loader after the request is completed
        loader.style.display = 'none';
    }
}

// Function to display the results
function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    data.forEach((item, index) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        const playerId = `kaltura_player_${index}`;
        // Convert start and end time from seconds to minutes and seconds
        const startTime = formatTime(item.start_time_in_seconds);
        const endTime = formatTime(item.end_time_in_seconds);

        resultItem.innerHTML = `
            <div class="metadata">

              <p><span class="label">Entry ID:</span> ${item.entry_id}</p>
              <p><span class="label">Start Time:</span> ${startTime}</p>
              <p><span class="label">End Time:</span> ${endTime}</p>
            </div>
            <p class="Body-1"><span></span> ${item.description}</p>
            <div id="${playerId}" class="kaltura-player"></div>

        `;

        resultsDiv.appendChild(resultItem);

        try {
            var kalturaPlayer = KalturaPlayer.setup({
                targetId: playerId, // Use dynamically created playerId,
                playback: {
                    startTime: item.start_time_in_seconds
                },
                provider: {
                    partnerId: 5837132,
                    uiConfId: 54741232
                }
            });

            kalturaPlayer.loadMedia({
                entryId: item.entry_id,  // Use the entryId from the response
                ks: "djJ8NTgzNzEzMnxg1Xrx6W91DwsUg9ENFs227xs6B-w37HZYmcAXbCl2jyHSzShbYsrKZz-8xLp9M88KMpG4dMAsdrJAZkEFOJVsoYh9fxKBgvo9blHw3bJdTQhSVj2H0rvxnfKf7zobqHxYpj8lAWixD9x5Vyo78taNf8mSCMslnWM8cJQs4hipAQ" // Insert a valid KS if needed
            })
        } catch (e) {
            console.error(e.message);
        }
    });
}

// Function to format time in minutes:seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Display the results on page load
displayResults(data);
