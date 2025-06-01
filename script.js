let cetData = [];

const collegeSelect = document.getElementById("college");
const departmentSelect = document.getElementById("department");
const categorySelect = document.getElementById("category");
const resultDiv = document.getElementById("result");

// Fetch and parse CSV
fetch("CollegeCuto.csv")
  .then(response => response.text())
  .then(csvText => {
    const lines = csvText.trim().split("\n").slice(1); // Skip header
    cetData = lines.map(line => {
      const [College, Department, Category, Cutoff] = line.split(",");
      return { College, Department, Category, Cutoff: parseInt(Cutoff) };
    });
    populateCollegeDropdown();
  });

function populateCollegeDropdown() {
  const colleges = [...new Set(cetData.map(item => item.College))];
  collegeSelect.innerHTML = "";
  colleges.forEach(college => {
    const option = document.createElement("option");
    option.value = college;
    option.textContent = college;
    collegeSelect.appendChild(option);
  });
  collegeSelect.dispatchEvent(new Event("change"));
}

collegeSelect.addEventListener("change", () => {
  const selectedCollege = collegeSelect.value;
  const departments = [...new Set(
    cetData.filter(item => item.College === selectedCollege).map(item => item.Department)
  )];
  departmentSelect.innerHTML = "";
  departments.forEach(dept => {
    const option = document.createElement("option");
    option.value = dept;
    option.textContent = dept;
    departmentSelect.appendChild(option);
  });
  departmentSelect.dispatchEvent(new Event("change"));
});

departmentSelect.addEventListener("change", () => {
  const selectedCollege = collegeSelect.value;
  const selectedDept = departmentSelect.value;
  const categories = [...new Set(
    cetData.filter(item => item.College === selectedCollege && item.Department === selectedDept)
           .map(item => item.Category)
  )];
  categorySelect.innerHTML = "";
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
});

function showCutoff() {
  const selectedCollege = collegeSelect.value;
  const selectedDept = departmentSelect.value;
  const selectedCategory = categorySelect.value;
  const result = cetData.find(item =>
    item.College === selectedCollege &&
    item.Department === selectedDept &&
    item.Category === selectedCategory

    
  );
  resultDiv.textContent = result ? `Cutoff Rank: ${result.Cutoff}` : "No data found for the selected combination.";
}
