const BASE_URL = "http://localhost:8080";

/* LOGIN */
export const loginApi = async ({ email, password }) => {
  const res = await fetch(
    `${BASE_URL}/users?email=${email}&password=${password}`
  );
  const data = await res.json();
  if (!data.length) throw new Error("Invalid login");
  return data[0];
};

/* STUDENTS */
export const getStudents = () =>
  fetch(`${BASE_URL}/students`).then(res => res.json());

/* TRANSACTIONS */
export const getTransactions = () =>
  fetch(`${BASE_URL}/payments`).then(res => res.json());

/* NEW PAYMENT */
export const createPayment = (data) =>
  fetch(`${BASE_URL}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      date: new Date().toISOString()
    }),
  }).then(res => res.json());
