import {
  ItemContainer,
  ItemSection,
  ItemSectionTitle,
  MainContent,
} from "./styles";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import CustomModal from "./CustomModal";
import ItemInfo from "./ItemInfo";

const Item = ({
  data,
  updateApplication,
  isWaiting,
  setFlag,
  flag,
  isMentorPage,
  updateApplications,
}) => {
  const [radioValue, setRadioValue] = useState(String(data.status));
  const [modalOpened, setModalOpened] = useState(false);

  function handleClick(event) {
    if (radioValue === event.target.value) {
      data.status = null;
      setRadioValue(null);
    } else {
      data.status = event.target.value;
      setRadioValue(data.status);
    }
    setFlag(!flag);
    updateApplication(data.id);
  }

  return (
    <ItemContainer>
      <CustomModal {...data} opened={modalOpened} setOpened={setModalOpened} />
      <DeleteButton
        CompanyName={data.company}
        applicationId={data.id}
        updateApplications={updateApplications}
      />
      <MainContent>
        <ItemInfo
          {...data}
          openModal={() => setModalOpened(true)}
          isNotInModal={true}
        />
        <ItemSection>
          <ItemSectionTitle>Etapas</ItemSectionTitle>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.profile}
                  disabled={isWaiting || isMentorPage}
                  onChange={(event) => {
                    data.profile = event.target.checked;
                    setFlag(!flag);
                    updateApplication(data.id);
                  }}
                  sx={{ minWidth: "50px" }}
                />
              }
              label="Análise de currículo e perfil"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.technic}
                  disabled={isWaiting || isMentorPage}
                  onChange={(event) => {
                    data.technic = event.target.checked;
                    setFlag(!flag);
                    updateApplication(data.id);
                  }}
                  sx={{ minWidth: "50px" }}
                />
              }
              label="Etapa técnica"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.behavior}
                  disabled={isWaiting || isMentorPage}
                  onChange={(event) => {
                    data.behavior = event.target.checked;
                    setFlag(!flag);
                    updateApplication(data.id);
                  }}
                  sx={{ minWidth: "50px" }}
                />
              }
              label="Etapa comportamental"
              labelPlacement="end"
            />
          </FormGroup>
        </ItemSection>
        <ItemSection>
          <ItemSectionTitle>Finalização</ItemSectionTitle>
          <RadioGroup value={radioValue}>
            <FormControlLabel
              value={1}
              // checked={!!data.status && Number(data.status) === 1}
              control={
                <Radio
                  onClick={handleClick}
                  disabled={isWaiting || isMentorPage}
                />
              }
              label="Passei"
            />
            <FormControlLabel
              value={2}
              // checked={!!data.status && Number(data.status) === 2}
              control={
                <Radio
                  disabled={isWaiting || isMentorPage}
                  onClick={handleClick}
                />
              }
              label="Não rolou"
            />
            <FormControlLabel
              value={3}
              // checked={!!data.status && Number(data.status) === 3}
              control={
                <Radio
                  disabled={isWaiting || isMentorPage}
                  onClick={handleClick}
                />
              }
              label="Desisti"
            />
          </RadioGroup>
        </ItemSection>
      </MainContent>
    </ItemContainer>
  );
};

export default Item;
