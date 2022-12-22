
const API = `http://localhost:5000/api/v1/todos?per_page=5`;
const APIPost = `http://localhost:5000/api/v1/todos`;
const APIRemove = `http://localhost:5000/api/v1/todos/remove-all`

let createDelete = document.createElement("div");
let createUpdate = document.createElement("div");
let itemClick = document.getElementsByClassName("item");
let titleItem = document.getElementsByClassName("titleItem");
let viewTotalItem = document.getElementById("viewTotalItem");
let inputPOST = document.getElementById("inputPOST");
let formAction = document.getElementById("formAction");
createDelete.className = "delete";
createDelete.id = "delete";
createDelete.innerHTML = "Delete";
createUpdate.className = "update";
createUpdate.id = "update";
createUpdate.innerHTML = "Completed";
let arr = [];

let fetchData = (url) => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].completed === true) {
                    titleItem[i].innerHTML = `<p style="text-decoration: line-through;">${data[i].title}</p>`;
                }
                else {
                    titleItem[i].innerHTML = `<p>${data[i].title}</p>`
                }
                if (data[i].completed === false) {
                    arr.push(data[i].title);
                }
            }
            viewTotalItem.innerHTML = `You have ${arr.length} completed`
            //............................................................//
            for (let i = 0; i < itemClick.length; i++) {
                itemClick[i].addEventListener("click", () => {
                    itemClick[i].append(createUpdate)
                    itemClick[i].append(createDelete);
                    let recover = document.getElementById("recover")
                    let updateHidden = document.getElementById("update");
                    let deleteHidden = document.getElementById("delete");
                    updateHidden.style.visibility = "visible"
                    deleteHidden.style.visibility = "visible"
                    recover.addEventListener("click", () => {
                        updateHidden.style.visibility = "hidden"
                        deleteHidden.style.visibility = "hidden"
                    });
                    updateHidden.addEventListener("click", () => {
                        let filePut = (filePut) => {
                            let dataPost = {
                                userId: data[i].UserId,
                                id: data[i].id,
                                title: data[i].title,
                                completed: true
                            }
                            fetch(filePut, {
                                method: 'PUT',
                                mode: 'cors', // no-cors, *cors, same-origin
                                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                credentials: 'same-origin', // include, *same-origin, omit
                                headers: {
                                    'Content-Type': 'application/json'
                                    // 'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                redirect: 'follow', // manual, *follow, error
                                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                                body: JSON.stringify(dataPost) // body data type must match "Content-Type" header
                            })
                                .then(response => response.json())
                                .then(data => {
                                    alert("success");
                                    window.location.reload();

                                })
                                .catch(err => console.log(err));
                        }
                        filePut(API);
                    });
                    deleteHidden.addEventListener("click", () => {
                        let fileDelete = (file) => {
                            let dataDelete = {
                                userId: data[i].userId,
                                id: data[i].id,
                                title: data[i].title,
                                completed: data[i].completed
                            };
                            fetch(file, {
                                method: 'DELETE',
                                mode: 'cors', // no-cors, *cors, same-origin
                                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                credentials: 'same-origin', // include, *same-origin, omit
                                headers: {
                                    'Content-Type': 'application/json'
                                    // 'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                redirect: 'follow', // manual, *follow, error
                                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                                body: JSON.stringify(dataDelete) // body data type must match "Content-Type" header

                            })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    alert("success");
                                    window.location.reload();

                                })
                                .catch(err => console.log(err));
                        };
                        fileDelete(API);
                    });
                });
            };
        })
        .catch((error) => console.log(error));
};
fetchData(API);

let fetchPost = (url) => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {

            formAction.addEventListener("submit", () => {
                let dataPost = {
                    userId: 11,
                    id: data.length + 1,
                    title: `${inputPOST.value}`,
                    completed: false

                }
                fetch('http://localhost:5000/api/v1/todos', {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify(dataPost) // body data type must match "Content-Type" header
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((error) => console.log(error));
            });
        })
        .catch((err) => console.log(err));
};
fetchPost(APIPost);

let buttonNextoViewTotal = document.getElementById("buttonNextoViewTotal");
buttonNextoViewTotal.addEventListener("click", () => {
    let fetchRemoveAll = (file) => {
        fetch(file, {
            method: 'DELETE',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        })
            .then((response) => response.json())
            .then(data => alert(data))
            .catch(err => console.log(err));

    };
    fetchRemoveAll(APIRemove);
});
