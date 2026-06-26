import GMFinalVisual from "./components/GMFinalVisual/GMFinalVisual";

export default function App() {
  return (
    <GMFinalVisual
      onAction={(action) => {
        console.log("GM ACTION:", action);
      }}
    />
  );
}
