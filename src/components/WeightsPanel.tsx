import { memo, useMemo, useCallback, useState } from "react";
// import { memo, useMemo } from "react";
import "./css/SidebarPanel.css";
import { useConfiguration, useColorSlice, useBarplotSlice, useGeoDispatch, useActiveTab } from "../hooks/hooks";
import { hexToRgb, rgbToString } from "../utilities/hexToRgb";
import { WeightsBarChart } from "./WeightsBarChart";

export const WeightsPanel = memo(function WeightsPanel() {
  // const { zipName } = useZip();
  const isExpanded = useBarplotSlice();
  const dispatch = useGeoDispatch();

  const handlePlotToggle = useCallback(
    () => dispatch({ type: "PLOT_TOGGLE" }),
    [dispatch],
  );

  const { activeGradientFile, availableFiles } = useConfiguration();
  
  const colors = useColorSlice();
  const theme = useMemo(
    () => ({ min: hexToRgb(colors.min), max: hexToRgb(colors.max) }),
    [colors.min, colors.max],
  );

  const weightsFile = useMemo(
    () => availableFiles.find((f) => f.name === activeGradientFile) ?? null,
    [availableFiles, activeGradientFile],
  );

  const readTab = useActiveTab();

  const [activeTab, setActiveTab] = useState(readTab);
  

  return (
    <div
      id="weights-panel"
      className={`plot-panel ${isExpanded ? "plot-expanded" : "plot-collapsed"}`}
      // className={"plot-panel"}
    >
      <header className="panel-header">
        {/* <h4>Metabolites</h4> */}
         {isExpanded && <h4>Related atrributes</h4>}
        <button onClick={handlePlotToggle} className="icon-button">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{
              transform: isExpanded ? "rotate(0deg)" : "rotate(180deg)",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button> 
      </header>
      {isExpanded && (weightsFile && (
        weightsFile.data.weights.length > 0 && (
        <div className="panel-content">
           <div className="tab__header">
            {weightsFile.data.weights.map((item,index) => (
              <li
              className={`${index === activeTab && "active"} tab__button`}
              key={item.type + "button"}
              onClick={() => setActiveTab(index)}
              >
                {item.type[0].toUpperCase() + item.type.slice(1)}
                </li>
            ))}
            </div>
            <div className="tab__content">
              <WeightsBarChart data={weightsFile.data.weights[activeTab].data} theme={theme} />
      </div>
          <div className="explanation">
            <>
              Bars indicate variables that <span style={{ color: rgbToString(theme.max) }}>increased </span> or <span style={{ color: rgbToString(theme.min) }}>decreased </span>
              along with the selected attribute in <strong>{`${weightsFile.displayName.replace(/(_.*|.geojson)/, "")}. `}</strong>
              The size of the bar indicates the magnitude of the effect.
            </>
          </div>
          
        </div>
        ) || (
        <div className="panel-content">
          <div className="explanation">
            No related attributes to display
          </div>
        </div>
        )
      ) || (
        <div className="panel-content">
          <div className="explanation">
          <p>
            Select a DATASET on the <strong>Settings</strong> panel. 
          </p>
          <ul>
            <li>
              Chemical composition: 50 chemical components of wine, including various aroma compounds
          </li>
          <li>
              Sensory attributes: 54 palate and aroma descriptors
          </li>
          <li>
              Main chemo-sensory pattern: a single integrated variable that captures the main pattern of covariation in the chemical and sensory profiles of the wines.
          </li>
          <li>
              Climate and composition: a single integrated variable that captures the main pattern of covariation in the climate and chemical profiles of the wines.
          </li>
          </ul>
          
          <p>
            Then, select a VARIETY & ATTRIBUTE from the dataset. A heatmap will appear, showing how the selected attribute varies across the region.
            <strong>This panel</strong> will display other related attributes that are significantly linked to it.
          </p>
          <div>
            <strong>Based on:</strong>
            <ul>
              <li>three years of sample collection at participating vineyards (shown in the map as grey circles) in the Margaret River area and Great Southern region</li>
              <li>standardized wine preparation from collected grapes</li>
              <li>chemical analyses by gas chromatography and other techniques</li>
              <li>sensory assessment by a panel of local winemakers, using the pivot method</li>
              <li>multivariate statistical regression of the full chemical profile to each separate sensory attribute.</li>
            </ul>
          </div>
        </div>
        </div>
        )
      )}
    </div>
  );
});