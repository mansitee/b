 document.addEventListener('DOMContentLoaded', function() { document.addEventListener ('contextmenu', function(event) {event.preventDefault(); });    
    
// Disable F12, Ctrl+Shift+I, and Ctrl+Shift+J    
document.addEventListener('keydown', function(event) { if (event.keyCode === 123 || // F12    
(event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 74))) { // Ctrl+Shift+I or Ctrl+Shift+J event.preventDefault();  }
 });

    // Tracking function
function trackUserActivity() {const activityData = { timestamp: new Date().toISOString(), userAgent: navigator.userAgent, url: window.location.href, };
        
console.log('User activity tracked:', activityData); }    

trackUserActivity();document.addEventListener('click', trackUserActivity); document.addEventListener('keydown', trackUserActivity);

 // Detect non-mobile devices
 if (window.innerWidth >= 768) { document.querySelector('.non-mobile-warning').style.display = 'block'; document.querySelector('.scroll-container').style.display = 'none'; }  });