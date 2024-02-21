;const firstName: HTMLInputElement = document.getElementById("firstName") as HTMLInputElement;
const lastName: HTMLInputElement = document.getElementById("lastName") as HTMLInputElement;
const group: HTMLInputElement = document.getElementById("group") as HTMLInputElement;
const dateOfBirth: HTMLInputElement = document.getElementById("dateOfBirth") as HTMLInputElement;
const salary: HTMLInputElement = document.getElementById("salary") as HTMLInputElement;
const filterLevel: HTMLInputElement = document.getElementById("filter") as HTMLInputElement;
const typeOfJob: HTMLInputElement = document.getElementById("typeOfJob") as HTMLInputElement;
const isMarried: HTMLInputElement = document.getElementById("isMarried") as HTMLInputElement;

const firstNameEdit: HTMLInputElement = document.getElementById("firstNameEdit") as HTMLInputElement;
const lastNameEdit: HTMLInputElement = document.getElementById("lastNameEdit") as HTMLInputElement;
const groupEdit: HTMLInputElement = document.getElementById("groupEdit") as HTMLInputElement;
const dateOfBirthEdit: HTMLInputElement = document.getElementById("dateOfBirthEdit") as HTMLInputElement;
const salaryEdit: HTMLInputElement = document.getElementById("salaryEdit") as HTMLInputElement;
const filterLevelEdit: HTMLInputElement = document.getElementById("filterLevelEdit") as HTMLInputElement;
const typeOfJobEdit: HTMLInputElement = document.getElementById("typeOfJobEdit") as HTMLInputElement;
const isMarriedEdit: HTMLInputElement = document.getElementById("isMarriedEdit") as HTMLInputElement;

const filterSelect: HTMLSelectElement = document.getElementById("filter-select") as HTMLSelectElement;
const filterCountry: HTMLSelectElement = document.getElementById("filter-country") as HTMLSelectElement;
const studentsList: HTMLTableElement = document.getElementById("students-list") as HTMLTableElement;
const btnAddStudent: HTMLButtonElement = document.getElementById("btn-add-student") as HTMLButtonElement;
const btnEditStudent: HTMLButtonElement = document.getElementById("btn-edit-student") as HTMLButtonElement;

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  group: string;
  dateOfBirth: string;
  filterLevel: string;
  typeOfJob: string;
  salary: string;
  isMarried: boolean;
}

let students: Student[] = JSON.parse(localStorage.getItem("students") || "[]");

displayStudents(students);

function displayStudents(students: Student[]) {
  let str: string = "";

  students.map((student: Student, i: number = 0) => {
    str += `
      <tr>
                <td>${i + 1}</td>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.group}</td>
                <td>${student.dateOfBirth}</td>
                <td>${student.filterLevel}</td>
                <td>${student.typeOfJob}</td>
                <td>${student.salary}</td>
                <td>${student.isMarried ? "Yes" : "No"}</td>
                <td>
                  <button class="btn bg-primary btn-sm text-light" data-bs-toggle="modal"
                  data-bs-target="#editModal" onclick="editStudent(${
                    student.id
                  })">Edit</button>
                  <button class="btn btn-danger btn-sm" onclick='deleteStudent(${
                    student.id
                  })'>Delete</button>
                </td>
      </tr>
      `;
  });
  studentsList.innerHTML = str;
}

function addStudent() {
  const student: Student = {
    id: students.length + 1,
    firstName: firstName.value,
    lastName: lastName.value,
    group: group.value,
    dateOfBirth: dateOfBirth.value,
    filterLevel: filterLevel.value,
    typeOfJob: typeOfJob.value,
    salary: salary.value,
    isMarried: isMarried.checked,
  };
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
  location.reload();

  firstName.value = "";
  lastName.value = "";
  group.value = "";
  dateOfBirth.value = "";
  filterLevel.value = "";
  typeOfJob.value = "";
  salary.value = "";
  isMarried.checked = false;
}
btnAddStudent.addEventListener("click", addStudent);

function deleteStudent(id: number) {
  if (confirm("You agree to delete this student explicitly?")) {
    let newStudents: Student[] = students.filter((std: Student) => std.id !== id);

    localStorage.setItem("students", JSON.stringify(newStudents));
    location.reload();
  }
}

let studentEditing: Student = {} as Student;
function editStudent(id: number) {
  let student: Student | undefined = students.find((student: Student) => student.id === id);
  if (student) {
    studentEditing = student;

    firstNameEdit.value = student.firstName;
    lastNameEdit.value = student.lastName;
    groupEdit.value = student.group;
    dateOfBirthEdit.value = student.dateOfBirth;
    salaryEdit.value = student.salary;
    filterLevelEdit.value = student.filterLevel;
    typeOfJobEdit.value = student.typeOfJob;
    isMarriedEdit.checked = student.isMarried;
  }
}

function updateStudent() {
  const student: Student = {
    id: studentEditing.id,
    firstName: firstNameEdit.value,
    lastName: lastNameEdit.value,
    group: groupEdit.value,
    dateOfBirth: dateOfBirthEdit.value,
    filterLevel: filterLevelEdit.value,
    typeOfJob: typeOfJobEdit.value,
    salary: salaryEdit.value,
    isMarried: isMarriedEdit.checked,
  };
  let newStudents: Student[] = students.map((st: Student) => (st.id === student.id ? student : st));
  localStorage.setItem("students", JSON.stringify(newStudents));
  location.reload();
}
btnEditStudent.addEventListener("click", updateStudent);

filterSelect.addEventListener("change", function (e: Event) {
  let grpp: string = (e.target as HTMLSelectElement).value;
  let newStudentsList: Student[] = [];
  if (grpp === "Select a level") {
    newStudentsList = students;
  } else {
    newStudentsList = students.filter((st: Student) => st.filterLevel === grpp);
  }
  displayStudents(newStudentsList);
});

filterCountry.addEventListener("change", function (e: Event) {
  let grp: string = (e.target as HTMLSelectElement).value;
  let newStudentsList: Student[] = [];
  if (grp === "Select your country") {
    newStudentsList = students;
  } else {
    newStudentsList = students.filter((st: Student) => st.group === grp);
  }
  displayStudents(newStudentsList);
});

search.addEventListener("input", function (e: Event) {
  let text: string = (e.target as HTMLInputElement).value;
  let newSearchedList: Student[] = [];
  if (text === "") {
    newSearchedList = students;
  } else {
    newSearchedList = students.filter(
      (st: Student) =>
        st.firstName.toLowerCase().includes(text.toLowerCase()) ||
        st.lastName.toLowerCase().includes(text.toLowerCase()) ||
        st.group.toLowerCase().includes(text.toLowerCase()) ||
        st.group.toLowerCase().includes(text.toLowerCase()) ||
        st.filterLevel.toLowerCase().includes(text.toLowerCase()) ||
        st.salary.toLowerCase().includes(text.toLowerCase()) ||
        st.dateOfBirth.toLowerCase().includes(text.toLowerCase()) ||
        st.typeOfJob.toLowerCase().includes(text.toLowerCase())
    );
  }
  displayStudents(newSearchedList);
});
