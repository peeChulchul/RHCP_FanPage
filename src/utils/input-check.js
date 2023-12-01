export function submitchecker({ content }) {
  if (content.trim() === "") {
    alert("내용을 입력해주세요");
    return false;
  }

  return true;
}
