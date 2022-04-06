export const checkMicPermission = async () => {
  let permitted = false;
  await navigator.permissions.query({ name: "microphone" }).then((result) => {
    if (result.state === "granted") {
      permitted = true;
    } else {
      permitted = false;
    }
  });
  return permitted;
};
