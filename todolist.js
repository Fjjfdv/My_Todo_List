const AddUser = document.getElementById('adduser');
const Btn = AddUser.innerText
const UserName = document.getElementById('username');
const records = document.getElementById('records');
let UserArray = []; // jo bhi input hum dege usko Array me store karega
let edit_id = null;

let Objstr = localStorage.getItem('users') // Ye abhi string ke form me h
//  console.log(UserArray);
if (Objstr != null) {
    UserArray = JSON.parse(Objstr);  // ye usko object me convert kr dega
}
DisplayInfo();
AddUser.onclick = () => {
    const Name = UserName.value;
    console.log(UserArray);
    if (edit_id != null) {
        // edit
        UserArray.splice(edit_id, 1, { 'name': Name });
        edit_id = null;
    } else {
        // insert 
        UserArray.push({ 'name': Name });
    }
    // alert(Name);
    SaveInfo(UserArray);
    UserName.value = '';
    AddUser.innerHTML = Btn
}
// value ko store , display,edit aur delete krne ke liye fun bana rhe h

function SaveInfo(UserArray) { // Page ko refresh krne ke baad sara data chala jata h isiliye hu data ko save krege local storage me
    let str = JSON.stringify(UserArray);
    localStorage.setItem('users', str); // ye obj ko nhi leta h hume string input deni hogi uske liye hum JSON.stringify() Method ka use krte h
    DisplayInfo();
}
function DisplayInfo() {  // useArray  ka data display karege
    let statement = '';
    UserArray.forEach((users, i) => {
        statement += ` <tr>
        <th scope="row">${i + 1}</th>
        <td>${users.name}</td>
        <td><i class='btn text-white far fa-edit btn-info mx-2' style='font-size:24px' onclick='EditInfo(${i})'></i><i class="btn btn-danger text-white material-icons" onclick='DeleteInfo(${i})'>delete</i></td>

    </tr>`;
    });
    records.innerHTML = statement;
}
function EditInfo(id) {
    // alert(id);
    edit_id = id;
    UserName.value = UserArray[id].name
    AddUser.innerHTML = "Save Changes"
}
function DeleteInfo(id) {
    // alert(id);
    UserArray.splice(id, 1); // splice ek Array ki method h isse hum delete aur Add kr sakte h // ek hi item delete krna h isiliye 1 likha h
    SaveInfo(UserArray);
  
}