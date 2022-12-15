// // Background Script

// chrome.runtime.onMessage.addListener(request => {

//     if (request == "OpenPopup") {
  
//         chrome.windows.create({
//             url: "hellomd.html",
//             type: "popup",
//             focused: true,
//             width: 400,
//             height: 600,
//             top: 0,
//             left: screen.width - 400,
//         }, () => {
//             console.log("Opened popup!")
//         })
  
//     }
  
//   })

//   chrome.runtime.onMessage.addListener((message, callback) => {
//     if (message.data === "OpenPopup") {
//         // chrome.alarms.create({delayInMinutes: 5})
//       }