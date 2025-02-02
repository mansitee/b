const jsonData = {
    "tab-bar": [ 
        {
            "href": "index.html",
            "class": "tab",
            "icon": "home",
            "label": "Home"
        },
        {
            "href": "yt.html",
            "class": "tab",
            "icon": "search",
            "label": "YouTube"
        },
        {
            "href": "list.html",
            "class": "tab",
            "icon": "favorite",
            "label": "Favorite"
        },
        {
            "href": "page/infode.html",
            "class": "tab",
            "icon": "person",
            "label": "Profile"
        }
    ]
};

function createTabBar(jsonData) {
    const tabBar = document.createElement('div');
    tabBar.className = 'tab-bar';

    jsonData["tab-bar"].forEach(tab => {
        const tabElement = document.createElement('a');
        tabElement.href = tab.href;
        tabElement.className = tab.class;

        const icon = document.createElement('i');
        icon.className = `material-icons`;
        icon.textContent = tab.icon;

        const label = document.createElement('span');
        label.textContent = tab.label;

        tabElement.appendChild(icon);
        tabElement.appendChild(label);
        tabBar.appendChild(tabElement);
    });

    document.body.appendChild(tabBar);
}

// Run the function to create and display the tab-bar
createTabBar(jsonData);