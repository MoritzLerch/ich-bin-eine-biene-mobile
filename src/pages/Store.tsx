import React, { useContext, useEffect, useState } from "react";
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
  IonItemDivider,
  IonPage,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { AppContext, saveState } from "../store/State";
import {
  getAdditionalBeePrice,
  getMultiplierPrice,
  getRotateSpeedLevelPrice,
  rotateSpeedLevel,
} from "../globals";
import {
  ActionBieneAddAdditional,
  ActionBieneAddAutoRotating,
  ActionBieneClickDecrease,
  ActionMakeMeAPresent,
  ActionMultiplierIncrease,
  ActionRotateSpeedLevelIncrease,
} from "../store/Actions";
import { RefresherEventDetail } from "@ionic/core";
import { flashOutline } from "ionicons/icons";

const StorePage: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [showThx, setShowThx] = useState<boolean>(false);

  const additionalBeePrice = getAdditionalBeePrice(
    state.biene.additionalBienen.length
  );
  const rotateSpeedLevelPrice = getRotateSpeedLevelPrice(
    state.biene.rotateSpeedLevel
  );
  const multiplierLevelPrice = getMultiplierPrice(state.biene.multiplierLevel);

  const autorotatingPrice = 10000;

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log("Begin async operation");

    setTimeout(() => {
      dispatch(ActionMakeMeAPresent());
      event.detail.complete();
    }, 100);
  }

  useEffect(() => {
    console.log("state saved")
    saveState(state);
  }, [state]);

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
        <IonRefresher slot="fixed" pullMin={400} onIonRefresh={doRefresh}>
          <IonRefresherContent
            pullingIcon={flashOutline}
            pullingText="Hier könnte deine Werbung sein!"
            refreshingSpinner="crescent"
            refreshingText="Ein kleines Geschenk"
          />
        </IonRefresher>
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
            <IonItem>
              Weitere Bienen
              <IonText slot="end">
                {state.biene.additionalBienen.length}/∞
              </IonText>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonItemDivider>Drehlevel</IonItemDivider>
        <IonItem>
          <IonButton
            onClick={() => {
              dispatch(ActionRotateSpeedLevelIncrease());
              dispatch(ActionBieneClickDecrease(rotateSpeedLevelPrice));
              setShowThx(true);
            }}
            disabled={
              !(state.biene.rotateSpeedLevel < rotateSpeedLevel.max) ||
              state.biene.clickCounter < rotateSpeedLevelPrice
            }>
            Level {state.biene.rotateSpeedLevel + 1} Kaufen
          </IonButton>
          <IonText slot="end">Preis: {rotateSpeedLevelPrice}</IonText>
        </IonItem>
        <IonItem>
          Drehlevel
          <IonText slot="end">
            {state.biene.rotateSpeedLevel}/{rotateSpeedLevel.max}
          </IonText>
        </IonItem>
        <IonItem>
          <IonProgressBar
            value={Math.min(
              state.biene.clickCounter / rotateSpeedLevelPrice,
              1.0
            )}
            color={
              state.biene.clickCounter < rotateSpeedLevelPrice
                ? "danger"
                : "success"
            }
          />
        </IonItem>

        <IonItemDivider>Weitere Bienen</IonItemDivider>
        <IonItem>
          <IonButton
            onClick={() => {
              dispatch(ActionBieneAddAdditional());
              dispatch(ActionBieneClickDecrease(additionalBeePrice));
              setShowThx(true);
            }}
            disabled={state.biene.clickCounter < additionalBeePrice}>
            Neue Biene kaufen
          </IonButton>
          <IonText slot="end">Preis: {additionalBeePrice}</IonText>
        </IonItem>
        <IonItem>
          Weitere Bienen
          <IonText slot="end">{state.biene.additionalBienen.length}/∞</IonText>
        </IonItem>

        <IonItem>
          <IonProgressBar
            color={
              state.biene.clickCounter < additionalBeePrice
                ? "danger"
                : "success"
            }
            value={Math.min(state.biene.clickCounter / additionalBeePrice, 1.0)}
          />
        </IonItem>

        <IonItemDivider>Multiplier</IonItemDivider>
        <IonItem>
          <IonButton
            onClick={() => {
              dispatch(ActionMultiplierIncrease());
              dispatch(ActionBieneClickDecrease(multiplierLevelPrice));
              setShowThx(true);
            }}
            disabled={state.biene.clickCounter < multiplierLevelPrice}>
            Multiplier kaufen
          </IonButton>
          <IonText slot="end">Preis: {multiplierLevelPrice}</IonText>
        </IonItem>
        <IonItem>
          Dein Multiplier
          <IonText slot="end">{state.biene.multiplierLevel}/∞</IonText>
        </IonItem>
        <IonItem>
          <IonProgressBar
            color={
              state.biene.clickCounter < multiplierLevelPrice
                ? "danger"
                : "success"
            }
            value={Math.min(
              state.biene.clickCounter / multiplierLevelPrice,
              1.0
            )}
          />
        </IonItem>

        <IonItemDivider>Autodreher</IonItemDivider>
        <IonItem>
          <IonButton
            onClick={() => {
              dispatch(ActionBieneAddAutoRotating(0));
              dispatch(ActionBieneClickDecrease(autorotatingPrice));
              setShowThx(true);
            }}
            disabled={state.biene.clickCounter < autorotatingPrice}>
            Autodreher kaufen
          </IonButton>
          <IonText slot="end">Preis: {autorotatingPrice}</IonText>
        </IonItem>
        <IonItem>
          Deine Autodreher
          <IonText slot="end">{state.biene.autoRotatingBees.length}/∞</IonText>
        </IonItem>
        <IonItem>
          <IonProgressBar
            color={
              state.biene.clickCounter < autorotatingPrice
                ? "danger"
                : "success"
            }
            value={Math.min(
              state.biene.clickCounter / autorotatingPrice,
              1.0
            )}
          />
        </IonItem>

        <IonToast
          isOpen={showThx}
          message="Danke für den Kauf!"
          buttons={[
            {
              text: "Bitte!",
              role: "cancel",
              handler: () => {
                setShowThx(false);
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default StorePage;
