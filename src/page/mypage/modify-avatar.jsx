import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaFileImage } from "react-icons/fa6";
import { BiSolidSave } from "react-icons/bi";
import defaultAvatar from "assets/img/etc/default_avatar.webp";
import { useDispatch } from "react-redux";
import { __modifyAuth } from "redux/modules/auth";
import { __modifyLetterAuth } from "redux/modules/letter";

const Avatar = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-image: ${({ $avatar }) => ($avatar ? `url(${$avatar})` : `url(${defaultAvatar})`)};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  @media (max-width: 600px) {
    width: 200px;
    height: 200px;
  }
`;

const Modifybox = styled.div`
  gap: calc(var(--spacing) * 2);
  display: flex;
  flex-direction: column;
`;

const PropertyWrapper = styled.div`
  width: 260px;
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
  font-size: var(--font-md);
  color: var(--color-black);
  border-radius: 8px;
  background-color: var(--color-dark-pink);
  cursor: pointer;
  filter: brightness(1.05);
  svg {
    margin-left: auto;
  }
  path {
    fill: var(--color-black);
  }
  &:hover {
    color: var(--color-primary-alt);
    filter: brightness(1.1);
  }
  &:hover path {
    fill: var(--color-primary-alt);
  }
  #fileUpload {
    display: none;
  }
  @media (max-width: 600px) {
    font-size: var(--font-sm);
  }
`;
export default function ModifyAvatar({ currentUser, avatar }) {
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const fileUploadRef = useRef();

  useEffect(() => {
    dispatch(__modifyLetterAuth(currentUser));
  }, [currentUser, dispatch]);

  useEffect(() => {
    setCurrentAvatar(avatar);
  }, [avatar]);

  function onClickFileUpload() {
    fileUploadRef.current.click();
  }

  async function onChangeFile(file) {
    // 파일없으면 리턴 alert띄워주는거 추가해야함
    if (!file) {
      return alert("파일을 첨부해주세요");
    }
    // 파일 확장자 검사
    const fileExtension = ["png", "jpg", "jpeg", "webp"];
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (fileExtension.includes(extension)) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => {
          setPreviewAvatar(reader.result);
          resolve();
        };
      });
    } else {
      alert("png, jpg, jpeg, webp 형식만 지원합니다.");
    }
  }

  async function onClickSave() {
    dispatch(
      __modifyAuth({ accesToken: currentUser.accesToken, nickname: currentUser.nickname, avatar: selectedFile })
    );
    setPreviewAvatar(null);
    setSelectedFile(null);
  }

  return (
    <>
      {previewAvatar ? <Avatar $avatar={previewAvatar} /> : <Avatar $avatar={currentAvatar} />}

      <Modifybox>
        <PropertyWrapper onClick={onClickFileUpload}>
          <input
            type="file"
            onChange={(e) => {
              onChangeFile(e.target.files[0]);
            }}
            ref={fileUploadRef}
            id="fileUpload"
          />
          아바타 수정
          <FaFileImage />
        </PropertyWrapper>
        {selectedFile && (
          <PropertyWrapper onClick={onClickSave}>
            변경사항 저장 <BiSolidSave />
          </PropertyWrapper>
        )}
      </Modifybox>
    </>
  );
}
