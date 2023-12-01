export function submitchecker({ content, contentRef }) {
  if (content.trim() === "") {
    alert("내용을 입력해주세요");
    contentRef.current.focus();
    return false;
  }

  return true;
}
