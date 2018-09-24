/*
  Async/await is a new way to write asynchronous code. Async/await is actually
  built on top of promises. It cannot be used with plain callbacks or node
  callbacks. Async/await is, like promises, non blocking. Async/await makes
  asynchronous code look and behave a little more like synchronous code.

  The async keyword before a function makes it always return a promise and
  allows to use await in it.

  The await keyword before a promise makes JavaScript wait until that promise
  settles, and then if it’s an error, the exception is generated, same as if
  throw error were called at that very place. Otherwise, it returns the result,
  so we can assign it to a value.

  Together they provide a great framework to write asynchronous code that is
  easy both to read and write.

  With async/await we rarely need to write promise.then/catch, but we still
  sometimes (e.g. in the outermost scope) have to use these methods.

  Async/await advantages:

  1. Concise and clean:
    With Async/await there is no need to write .then, create an anonymous function
    to handle the response, give a name data to a variable, or nest the code.

  2. Error handling:
    Async/await makes it possible to handle both synchronous and asynchronous errors
    with the same construct, good old try/catch. With promises, the try/catch will
    not handle if JSON.parse fails because it’s happening inside a promise. Instead
    We needed to call .catch on the promise and duplicate the error handling code.
  
  3. Intermediate values:
    With Async/await there is no need to create arrays (e.g. return
    Promise.all([value1, promise2(value1)])) or temporary variables to pass
    a value from one promise to another.
  
  4. Error stacks:
    The error stack returned from a promise chain gives no clue of where the error
    happened. However, the error stack from async/await points to the function that
    contains the error.
  
  5. Debugging:
    Debugging promises has always been such a pain for 2 reasons:
    1. Can’t set breakpoints in arrow functions that return expressions (no body).
    2. Setting a breakpoint inside a .then block and using debug shortcuts like
       step-over, the debugger will not move to the the following .then because
       it only “steps” through synchronous code.
    With async/await arrow functions are not needed as much, and await calls can be
    stepped through exactly as if they were normal synchronous calls.
*/
const users = [
  { id: 1, name: 'John', schoolId: 101 },
  { id: 2, name: 'Jane', schoolId: 999 }
];

const grades = [
  { id: 1, schoolId: 101, grade: 86 },
  { id: 2, schoolId: 999, grade: 100 },
  { id: 3, schoolId: 101, grade: 80 }
];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id of ${id}`);
    }
  });
};

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId));
  });
};

const getStatus = (userId) => {
  let user;
  return getUser(userId).then((tempUser) => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average = 0;

    if (grades.length > 0) {
      average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }

    return `${user.name} has a ${average}% in the class.`;
  });
};

const getStatusAlt = async (userId) => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  let average = 0;
  
  if (grades.length > 0) {
    average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
  }

  return `${user.name} has a ${average}% in the class.`;
};

getStatusAlt(1).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e);
});
