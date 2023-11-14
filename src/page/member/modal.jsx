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
`;

const ModalTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    white-space: nowrap;
    font-size: 0.8rem;
    font-weight: 600;
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
    padding: var(--spacing) calc(var(--spacing) * 4);
  }
`;

const ModalBottom = styled.div`
  margin: calc(var(--spacing) * 4) 0;
  flex: 1;

  h1 {
    font-size: var(--font-md);
    font-weight: bold;
    padding: calc(var(--spacing) * 2) 0;
  }
  p {
    line-height: 1.1;
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
  svg {
    fill: var(--color-primary-alt);
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

const ContentArea = styled.textarea`
  resize: none;
  color: black;
  height: 100%;
  width: 100%;
  padding: calc(var(--spacing) * 2);
  line-height: 1.1;
  &:focus {
    outline: 3px solid var(--color-primary-alt);
  }
`;

export default function Modal({ selectedLetter, setLocalstorageLetters }) {
  const { nickname, createdAt, content, writedTo, id, avatar = logoUrl } = selectedLetter;
  const [isModify, setIsModify] = useState(false);
  const [contentValue, setContentValue] = useState(`${content}`);
  const [nickNameValue, setNickNameValue] = useState(nickname);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  function onClickDelete() {
    dispatch(deleteLetter(id));

    navigate(`../${params.name}`);
  }

  function onClickSave() {
    dispatch(
      modifyLetter({ id, nickname: nickNameValue, content: contentValue, createdAt: getYMDHM(), writedTo, avatar })
    );
    setIsModify(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <Container>
      {isModify ? (
        <>
          <ModalTop>
            <AvaterWrapper>
              <Avatar $img={avatar} />
              <input onChange={(e) => setNickNameValue(e.target.value)} value={nickNameValue} />
            </AvaterWrapper>
          </ModalTop>
          <ModalBottom>
            <ContentArea
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
            <h1>To {writedTo}</h1>
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
  );
}
