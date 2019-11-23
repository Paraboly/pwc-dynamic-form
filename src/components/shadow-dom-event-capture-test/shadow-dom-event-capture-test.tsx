export default class CaptureTest {
  constructor(target) {
    target.addEventListener("click", e => {
      alert("Here we are");
      console.log(e);
    });
  }
}
