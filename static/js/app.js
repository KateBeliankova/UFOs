// Import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

//add function to build the table
function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
    // Next, loop through each object in the data and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");
      // Loop through each field in the dataRow and add each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
  }

// Keep track of all filters
var filters = {};

// Function for handling what to do after an input is given
function updateFilter() {
    // Clear list of finlters with every function start
    filters = {};
    // List of elements
    var elements = ["datetime", "city", "state", "country", "shape"]
    // Save the element and value of the filter that was changed
    elements.forEach(element => {
        let filter = d3.select("#"+element).property("value");
        // If a filter value was entered then add that filterId and value to the filters list otherwise, clear that filter from the filters object
        if(filter){
            filters[element] = filter;
        }
    });
    // Call function to apply all filters and rebuild the table    
    filterTable();
}

// Function to apply all filters and rebuild the table
function filterTable() {
    // Set the filteredData to the tableData
    var filteredData = tableData;
    // Loop through all of the filters and keep any data that matches the filter values
    Object.entries(filters).forEach(([key, value]) => {
        if (key) {
            switch(key) {
                case "datetime":
                filteredData = filteredData.filter(row => row.datetime === value);
                break;
                case "city":
                filteredData = filteredData.filter(row => row.city === value);
                break;
                case "state":
                filteredData = filteredData.filter(row => row.state === value);
                break;
                case "country":
                filteredData = filteredData.filter(row => row.country === value);
                break;
                case "shape":
                filteredData = filteredData.filter(row => row.shape === value);
                break;
            };    
        }
    });
    // Rebuild the table using the filtered data
    buildTable(filteredData);
};

// Add filter button we’ll build on our webpage. "#filter-btn" - id for HTML tag for linking our code directly to the filter button.
d3.selectAll("#filter-btn").on("click", updateFilter);
// Build the table when the page loads
buildTable(tableData);

