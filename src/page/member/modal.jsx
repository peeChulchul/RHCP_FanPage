import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsFillPencilFill } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiSolidSave } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { getYMDHM } from "utils/format-data";
import logoUrl from "assets/img/logo/logo.png";
import { useDispatch } from "react-redux";
import { deleteLetter, modifyLetter } from "redux/modules/letter";
import { TextShadow } from "components/text";

const BackDrop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-black);
  overflow: hidden;
  cursor: pointer;
  z-index: 1;
`;

const Container = styled.section`
  width: 500px;
  height: 500px;
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 6);
  background-color: var(--color-bg);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  z-index: 2;
  border-radius: 8px;
  box-shadow: 1px 2px 10px var(--color-white);
`;

const ModalTop = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--color-black);
  align-items: center;
  p {
    color: var(--color-black);
    white-space: nowrap;
    font-size: 0.8rem;
    font-weight: 600;
  }
  h1 {
    color: var(--color-black);
    font-size: var(--font-md);
    font-weight: 600;
    text-align: center;
  }
`;
const AvaterWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: calc(var(--spacing) * 4);
  input {
    flex: 1;
    font-size: var(--font-mg);
    color: var(--color-black);
    padding: calc(var(--spacing) * 2);
    font-size: var(--font-md);
    font-weight: 600;
  }
`;
const Avatar = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${(props) => `url(${props.$img})`};
`;

const ModalBottom = styled.div`
  margin: calc(var(--spacing) * 4) 0;
  flex: 1;
  background-color: var(--color-dark-pink);
  border-radius: 12px;
  filter: brightness(105%);
  h1 {
    font-size: var(--font-lg);
    font-weight: bold;
    margin: 0 0 calc(var(--spacing) * 2) 0;
    padding: calc(var(--spacing) * 2);
  }
  p {
    line-height: 1.1;
    color: var(--color-black);
    padding-left: calc(var(--spacing) * 3);
  }
`;

const TextStrong = styled(TextShadow)``;

const ContentArea = styled.textarea`
  resize: none;
  color: black;
  height: 100%;
  width: 100%;
  padding: calc(var(--spacing) * 2);
  line-height: 1.1;
  font-size: 1.1rem;
  &:focus {
    outline: 3px solid var(--color-primary-alt);
  }
`;

const ModalButtons = styled.div`
  margin-left: auto;
  display: flex;
  gap: calc(var(--spacing) * 6);
  button {
    font-size: var(--font-md);
    cursor: pointer;
  }
  button:hover {
    svg {
      fill: var(--color-accent);
    }
  }
  svg {
    fill: var(--color-primary-alt);
  }
`;

export default function Modal({ selectedLetter, setLocalstorageLetters }) {
  const { nickname, createdAt, content, writedTo, id, avatar = logoUrl } = selectedLetter;
  const [isModify, setIsModify] = useState(false);
  const [contentValue, setContentValue] = useState(`${content}`);
  const [nickNameValue, setNickNameValue] = useState(nickname);
  const navigate = useNavigate();
  const { name } = useParams();
  const dispatch = useDispatch();

  function onClickDelete() {
    const agreed = window.confirm("정말로 삭제하시겠습니까?");
    if (agreed) {
      dispatch(deleteLetter(id));
      navigate(`../${name}`);
    } else return;
  }

  function onClickSave() {
    if (contentValue === content) {
      return alert("수정된 내용이 없습니다.");
    }
    dispatch(
      modifyLetter({ id, nickname: nickNameValue, content: contentValue, createdAt: getYMDHM(), writedTo, avatar })
    );
    setIsModify(false);
  }

  function onClickBackDrop() {
    if (isModify) {
      return alert("수정중입니다!.");
    } else return navigate(`../${name}`);
  }

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <>
      <BackDrop onClick={onClickBackDrop} />
      <Container>
        {isModify ? (
          <>
            <ModalTop>
              <AvaterWrapper>
                <Avatar $img={avatar} />
                <input maxLength={20} onChange={(e) => setNickNameValue(e.target.value)} value={nickNameValue} />
              </AvaterWrapper>
            </ModalTop>
            <ModalBottom>
              <ContentArea
                maxLength={100}
                draggable={false}
                onChange={(e) => setContentValue(e.target.value)}
                value={contentValue}
              ></ContentArea>
            </ModalBottom>
            <ModalButtons>
              <button onClick={onClickSave}>
                <BiSolidSave />
              </button>
            </ModalButtons>
          </>
        ) : (
          <>
            <ModalTop>
              <AvaterWrapper>
                <Avatar $img={avatar} />
                <h1>{nickname}</h1>
              </AvaterWrapper>
              <p>{createdAt}</p>
            </ModalTop>
            <ModalBottom>
              <TextStrong>To {writedTo}</TextStrong>
              <p>{content}</p>
            </ModalBottom>
            <ModalButtons>
              <button onClick={() => setIsModify(true)}>
                <BsFillPencilFill />
              </button>
              <button>
                <RiDeleteBin6Fill onClick={onClickDelete} />
              </button>
            </ModalButtons>
          </>
        )}
      </Container>
    </>
  );
}
