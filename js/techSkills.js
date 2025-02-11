const btnIos = document.getElementById('skill-button-ios');
const btnWeb = document.getElementById('skill-button-web');
const btnAndroid = document.getElementById('skill-button-android');

const allBtn = [btnAndroid, btnIos, btnWeb];

const skillSets = {
    iOS: {
        Languages: ['Swift'],
        Frameworks: ['SwiftUI', 'UIKit', 'Swift Charts'],
        Database: ['Firebase', 'CoreData'],
        'Other/Tools': ['Git', 'Xcode', 'CocoaPods', 'Grand Dispatch Queue', 'MVVM', 'MVC'
        ]
    },
    Android: {
        Languages: ['Kotlin', 'Java'],
        Frameworks: ['Android SDK'],
        Database: ['Firebase'],
        'Other/Tools': ['Git','Android Studio', 'Gradle', 'MVVM', 'MVC']
    },
    Web: {
        Languages: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL'],
        Frameworks: ['React.js', 'Node.js', 'Express.js', 'jQuery'],
        Database: ['MySQL', 'Firebase'],
        'Other/Tools': ['Git', 'VSCode', 'SCSS', 'Apache', 'WHM/cPanel', 'MVC']
    }
};

function changeSkillSet(skillSet) {
    // Remove 'selected' class from all buttons
    allBtn.forEach(button => {
        button.classList.remove('selected'); // Fixed: classList instead of ClassList
    });

    // Add 'selected' class to the clicked button
    document.getElementById(`skill-button-${skillSet.toLowerCase()}`).classList.add('selected');

    // Clear existing lists
    document.getElementById('languages-list').innerHTML = '';
    document.getElementById('frameworks-list').innerHTML = '';
    document.getElementById('database-list').innerHTML = '';
    document.getElementById('other-tools-list').innerHTML = '';

    // Populate the lists based on the selected skill set
    Object.keys(skillSets[skillSet]).forEach(category => {
        const listElement = document.getElementById(`${category.toLowerCase().replace(/\//g, '-').replace(' ', '-')}-list`);
        skillSets[skillSet][category].forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listElement.appendChild(li);
        });
    });
}

// Default to iOS skill set
changeSkillSet('iOS');
