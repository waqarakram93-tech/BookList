function addTask() {
    console.log("here");
    const fs = require('fs');
    const path = "record.json";

    if (fs.existsSync(path)) {
        var inputItem = document.getElementById("itemInput").value;
        const record = {
            "id": 1,
            "task": inputItem,
            "status": "todo"
        };

        // convert JSON object to string
        const data = JSON.stringify(record);

        // write JSON string to a file
        fs.writeFile('record.json', data, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });
    } else {
        console.log("DOES NOT exist:", path);
    }
}
