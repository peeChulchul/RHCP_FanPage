export function submitchecker({ nickname, content, nickNameRef, contentRef }) {
  console.log(nickname, content);

  if (nickname.trim() === "") {
    alert("닉네임을 입력해주세요");
    nickNameRef.current.focus();
    return false;
  }

  if (content.trim() === "") {
    alert("내용을 입력해주세요");
    contentRef.current.focus();
    return false;
  }

  return true;
}
