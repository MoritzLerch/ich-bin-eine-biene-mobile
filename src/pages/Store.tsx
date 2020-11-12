import React, { useContext } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { AppContext, saveState } from "../store/State";
import { rotateSpeedLevel } from "../globals";
import {
  ActionBieneClickDecrease,
  ActionBieneClickIncrease,
  ActionRotateSpeedLevelIncrease,
} from "../store/Actions";

const StorePage: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Store</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Kontostand</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              Saltos
              <IonText slot="end">{state.biene.clickCounter}</IonText>
            </IonItem>
            <IonItem>
              Drehlevel
              <IonText slot="end">
                {state.biene.rotateSpeedLevel}/{rotateSpeedLevel.max}
              </IonText>
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Drehlevel</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton
              onClick={() => {dispatch(ActionRotateSpeedLevelIncrease());dispatch(ActionBieneClickDecrease(rotateSpeedLevel.price))}}
              disabled={!(state.biene.rotateSpeedLevel < (rotateSpeedLevel.max))||(state.biene.clickCounter<rotateSpeedLevel.price)}
  >Level {state.biene.rotateSpeedLevel+1} Kaufen</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default StorePage;
