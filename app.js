const { response } = require('express');
const express = require('express');
const app = express();
const port = 5000;
const fs = require('fs');
const pathURL = `./ask-community-project/todos.json`
const bodyParser = require('body-parser');
const { stringify } = require('querystring');
const logger = require('morgan');
const path = require('path');
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.sendFile(path.join(__dirname, "./public/index.html"));
})
app.get("/api/v1/todos", (req, res) => {
    let reqQuery = req.query.per_page;
    fs.readFile(pathURL, { encoding: "utf8" }, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: err })
        } else {
            let dataParse = JSON.parse(data);
            let firstTodos = dataParse.slice(0, reqQuery);
            res.status(200).json(firstTodos)
        };
    });
});

app.get("/api/v1/todos", (req, res) => {
    fs.readFile(pathURL, { encoding: "utf8" }, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: err })
        } else {
            let dataParse = JSON.parse(data);
            res.status(200).json(dataParse)
        };
    });
});

app.post('/api/v1/todos', (req, res) => {
    let reqBody = req.body;
    let reqParameters = req.params;
    let reqQuery = req.query;
    fs.readFile(pathURL, { encoding: 'utf8' }, (err, data) => {
        if (err) throw err;
        else {
            let dataParse = JSON.parse(data);
            dataParse.unshift(reqBody)
            fs.writeFile(pathURL, JSON.stringify(dataParse), (err) => {
                if (err) throw err;
                else {
                    res.status(200).send("Sucess");
                };
            });
        };
    });
});
app.put('/api/v1/todos', (req, res) => {
    let reqBody = req.body;
    fs.readFile(pathURL, { encoding: 'utf8' }, (err, data) => {
        if (err) throw err;
        else {
            dataParse = JSON.parse(data);
            let todo = dataParse.find(index => index.id === reqBody.id);
            if (todo) {
                Object.assign(todo, reqBody);
                fs.writeFile(pathURL, JSON.stringify(dataParse), (err) => {
                    if (err) throw err;
                    else {
                        res.status(200).json("Updates successfully");
                    }
                });
            };
        };
    });
});
app.delete('/api/v1/todos', (req, res) => {
    let reqBody = req.body;
    fs.readFile(pathURL, { encoding: 'utf8' }, (err, data) => {
        if (err) throw err;
        else {
            let dataParse = JSON.parse(data);
            let todo = dataParse.findIndex(index => index.id === reqBody.id)
            console.log(todo);
            if (todo !== -1) {
                dataParse.splice(todo, 1)
                fs.writeFile(pathURL, JSON.stringify(dataParse), (err) => {
                    if (err) throw err;
                    else {
                        res.status(200).json("Delete successfully");
                    }
                })
            }
            else {
                res.status(500).json(" Not found ");
            };
        };
    });
});
app.delete('/api/v1/todos/remove-all', (req, res) => {
    fs.readFile(pathURL, { encoding: 'utf8' }, (err) => {
        if (err) throw err;
        else {
            fs.unlink(pathURL, err => {
                if (err) throw err;
                else {
                    res.status(200).json("Remove all finish");
                }
            })
        }
    })
});

// app.get("/api/v1/todos?per_page=5", (req, res) => {
//     let reqQuery = req.query.per_page;
//     console.log(reqQuery);
//     res.json("hello");
//     //  fs.readFile(pathURL, { encoding: "utf8" }, (err, data) => {
//     //     if (err) throw err;
//     //     else{
//     //         let dataParse = JSON.parse(data);
//     //         res.status(200).json(dataParse);
//     //     };
//     // });
// })




//Baitap 1,2,3:
// const checkExist = (req, res, next) => {
//     let reqParameters = req.params;
//     console.log();
//     let reqBody = req.body;
//     fs.readFile(pathURL, { encoding: 'utf8' }, (err, data) => {
//         if (err) throw err;
//         else {
//             let dataParse = JSON.parse(data);
//             let users = dataParse.find(user => user.id === parseInt(reqParameters.id));
//             if (!users) {
//                 res.status(500).json(" Todo not found");
//             }
//             else {
//                 next();
//             }
//         }
//     })
// };
// const checkExist2 = (req, res, next) => {
//     let reqBody = req.body;
//     fs.readFile(pathURL, { encoding: 'utf8' }, (err, data) => {
//         if (err) throw err;
//         else {
//             let dataParse = JSON.parse(data);
//             console.log(dataParse[1].title);
//             let users = dataParse.find(user => user.title === reqBody.title);
//             if (users) {
//                 res.status(500).json(" Todo already exists");
//             }
//             else {
//                 next();
//             }
//         }
//     })
// };




// app.get('/api/v1/todos/:id', checkExist, (req, res) => {
//     let idParameters = parseInt(req.params.id);
//     fs.readFile(pathURL, { encoding: 'utf8' }, (err, data) => {
//         if (err) throw err;
//         else {
//             let dataParse = JSON.parse(data);
//             let users = dataParse.find(user => user.id === idParameters);
//             if (users) {
//                 res.status(200).json(users);
//             }
//         };
//     });
// })

// app.post('/api/v1/todos', checkExist2, (req, res) => {
//     let reqBody = req.body;
//     let reqBodyId = parseInt(req.body.id);
//     console.log(typeof reqBodyId);
//     let reqParameters = req.params;
//     fs.readFile(pathURL, { encoding: 'utf8' }, (err, data) => {
//         if (err) throw err;
//         else {
//             let dataParse = JSON.parse(data);
//             let users = dataParse.find(user => user.id === reqBodyId)
//             if (!users) {
//                 dataParse.push(reqBody);
//                 fs.writeFile(pathURL, JSON.stringify(dataParse), (err) => {
//                     if (err) throw err;
//                     else {
//                         res.status(200).json(" Success Post question !");
//                     };
//                 });
//             }

//         };
//     });
// });
// app.put('/api/v1/todos/:id', checkExist, (req, res) => {
//     let reqBody = req.body;
//     let reqParameters = req.params;
//     console.log(reqParameters);
//     fs.readFile(pathURL, { encoding: 'utf8' }, (err, data) => {
//         if (err) throw err;
//         else {
//             let dataParse = JSON.parse(data);
//             let users = dataParse.find(user => user.id === parseInt(reqParameters.id));
//             console.log(users)
//             if (users) {
//                 Object.assign(users, reqBody)
//                 fs.writeFile(pathURL, JSON.stringify(dataParse), (err) => {
//                     if (err) {
//                         res.status(500).json({
//                             err: err,
//                             message: err.message,
//                             code: 500
//                         });
//                     }
//                     else {
//                         res.status(200).json("PUT sucessfully");
//                     };
//                 });
//             };
//         };
//     });
// });


// app.delete("/api/v1/todos/:id", checkExist, (req, res) => {
//     let reqParameters = req.params;
//     console.log(reqParameters.id);
//     fs.readFile(pathURL, { encoding: "utf8" }, (err, data) => {
//         if (err) throw err;
//         else {
//             let dataParse = JSON.parse(data);
//             let users = dataParse.findIndex(element => element.id === parseInt(reqParameters.id))
//             console.log(users);
//             if (users !== -1) {
//                 dataParse.splice(users, 1);
//                 fs.writeFile(pathURL, JSON.stringify(dataParse), (err) => {
//                     if (err) throw err;
//                     else {
//                         res.status(200).json("Delete Success");
//                     }
//                 });
//             }
//         }
//     });
// })
app.listen(port, () => {
    console.log(`Example app listening on port: http://localhost:${port}`);
});




// Ki???n th???c Middleware => m???t function n???m gi???a endpoint v?? callback function cu???i c??ng
// L???c v?? l??m s???ch c??c request
// C??c middleware gi???ng nh?? c??c b??i test
// Khi m?? v?????t qua c??c middleware, th?? m??nh s??? next ssang c??c middleware m???i
// B???n ch???t c???a express, l?? c??c middleware l???ng v???i nhau
// function middleware1(req, res, next) {
//     // logic check 1
//     // s??? c?? m???t logic check 1
//     // N???u kh??ng th??nh c??ng th?? s??? ngay l???p t???c response v??? cho client
//     console.log(" check 1");
//     // Khi ???? th??nh c??ng
//     next();
// }
// function middleware1(req, res, next) {
//     // logic check 2
//     // s??? c?? m???t logic check 2
//     // N???u kh??ng th??nh c??ng th?? s??? ngay l???p t???c response v??? cho client
//     console.log(" check 2");
//     // Khi ???? th??nh c??ng
//     next()
// }
// function middleware1(req, res, next) {
//     // logic check 3
//     // s??? c?? m???t logic check 2
//     // N???u kh??ng th??nh c??ng th?? s??? ngay l???p t???c response v??? cho client
//     console.log(" check 3");
//     // Khi ???? th??nh c??ng
//     next()
// }



// user interface
// user ???prience