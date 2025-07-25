import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import polyline from "polyline";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { useEffect, useState } from "react";

// Custom marker fix for Leaflet icons not showing in React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const SafeRoute = () => {
  const [routes, setRoutes] = useState([]);
  const paths = [
    {
      route: {
        summary: {
          distance: 41352.7,
          duration: 2720.7,
        },
        segments: [
          {
            distance: 41352.7,
            duration: 2720.7,
            steps: [
              {
                distance: 822.5,
                duration: 197.4,
                type: 11,
                instruction: "Head west",
                name: "-",
                way_points: [0, 12],
              },
              {
                distance: 6005.8,
                duration: 332.6,
                type: 0,
                instruction: "Turn left onto RN 24",
                name: "RN 24",
                way_points: [12, 42],
              },
              {
                distance: 15123,
                duration: 870.7,
                type: 0,
                instruction: "Turn left onto RNIE 4",
                name: "RNIE 4",
                way_points: [42, 211],
              },
              {
                distance: 2458.2,
                duration: 147.5,
                type: 1,
                instruction: "Turn right onto RN 28",
                name: "RN 28",
                way_points: [211, 252],
              },
              {
                distance: 14091.4,
                duration: 1014.6,
                type: 6,
                instruction: "Continue straight",
                name: "-",
                way_points: [252, 369],
              },
              {
                distance: 2851.8,
                duration: 157.9,
                type: 1,
                instruction: "Turn right onto RN 3",
                name: "RN 3",
                way_points: [369, 375],
              },
              {
                distance: 0,
                duration: 0,
                type: 10,
                instruction: "Arrive at RN 3, on the right",
                name: "-",
                way_points: [375, 375],
              },
            ],
          },
        ],
        bbox: [2.373133, 7.214401, 2.642802, 7.276681],
        geometry:
          "gflk@}noMnApEZ`BPlAFRLL~BnAlEnBbAh@dB|@z@h@~DlDpAvAfF_C|By@`EqAbJcCpJaCbx@kS|FuAn@OtAa@x@UbF}BnB{@`GwCTEd@Id@GxAAj@@pDThBHrBDnH@f_@Klz@[vIGlTGpUCpFEpFHpEF@}@?O@kCA_HCkACcACkAEiD?OScBUqAI[_@cAiB{DUe@k@mAwD{HcBqDw@{A}CmGKSs@{AaC_FS]]eAa@sAIe@Eg@[{AW}@y@iCISw@uBQo@GYEgC@uADk@VsB@e@@cE@cAJiCPuBNgED_CG_CIo@e@}Bo@iC{@uCEOaAiDmAeEwCmJyAcFYuA_@gCwBaXWoBSyAuCsQkBcMYwBWcBOyAEw@E{ABsAJgBrAeMVeCv@_HbAmKDY|@aJ^yFHsF?eC?_BOyPMqOA_A_@wK?w@FgBNsApB{MrEmZdBcLl@iDd@_CrEySV{@\\}@l@mAt@cAr@w@n@i@l@c@`Ai@hAk@|GkCjDqAhC{@`DkAzBy@hN{EpAm@r@c@fA_Aj@m@x@eAl@iA\\eAXeAN_AHoAHkCCcP?}DCoBMyB_@qBk@cBg@kAs@eAi@u@y@y@kDkCsMsKoCgC_@c@_DwCsAkA_@WuGeGyBcCgBgCi@}@y@aBm@wAi@}Ac@{A[uAo@uDmAaIy@gFaAyFe@iB]}@s@uA]g@iAwAmFeGqGiHaBkBeAoAg@w@Yi@Um@Qo@UgAa@{BWaA[w@]o@a@i@w@q@tAqD|@sCHa@Ba@?wAAkB?iCBaCHiAj@cCJq@Bm@?mAAqAJiFNgB@oAAeAFkBNwBJq@fB_FvAoEj@oDFqAAq@GgAKeH@gAGyF?qAFg@XaBD]?SCmAWgEMyA[kBKk@Sg@GOe@o@o@s@aCeC{AwA{CaDyBeCm@w@qA_B{BsCsAwBsB}CgEyFmJuK]]q@iAwDyIi@sCi@oCe@cCo@kCU{Be@_CoAsFkE{EkAy@[[o@}@e@_AeCuM_I}Mu@kFIwEA{@GiEuDcVkNma@sNmWxG{VhHuUrB{GdBgGrFcTh@u@z@eBfBoD^{@R_AX}@J{@QcAMa@Co@SsA}@qCMu@Ce@@a@Do@FwADm@FYZsATi@Xc@lDcEd@}@^qARu@x@}CpAsDb@gCVgCjCiOhFaLhAqBdB_DhFyBRIzAiBTu@fAoCZqAIYa@}FCeEbEeMf@qBJ_@@[C[AqLPcHF_CN{@UaC?{@K{C?u@Cq@@iA}BuGiFqEcI}DwAaDQqAyN}SoQqT`@qHoE{OoDyFGcL~@_E]wGhBwFbCcHk@qBxF}@~WyDtd@{G~TaD~k@yHzQ{B",
        way_points: [0, 375],
      },
      safetyScore: 48.02,
    },
    {
      route: {
        summary: {
          distance: 57764.2,
          duration: 3436,
        },
        segments: [
          {
            distance: 57764.2,
            duration: 3436,
            steps: [
              {
                distance: 822.5,
                duration: 197.4,
                type: 11,
                instruction: "Head west",
                name: "-",
                way_points: [0, 12],
              },
              {
                distance: 6005.8,
                duration: 332.6,
                type: 0,
                instruction: "Turn left onto RN 24",
                name: "RN 24",
                way_points: [12, 42],
              },
              {
                distance: 33510.7,
                duration: 1894.3,
                type: 0,
                instruction: "Turn left onto RNIE 4",
                name: "RNIE 4",
                way_points: [42, 360],
              },
              {
                distance: 982.3,
                duration: 78.6,
                type: 1,
                instruction: "Turn right",
                name: "-",
                way_points: [360, 378],
              },
              {
                distance: 988.8,
                duration: 71.2,
                type: 1,
                instruction: "Turn right",
                name: "-",
                way_points: [378, 393],
              },
              {
                distance: 15454.1,
                duration: 862,
                type: 1,
                instruction: "Turn right onto RN 3",
                name: "RN 3",
                way_points: [393, 460],
              },
              {
                distance: 0,
                duration: 0,
                type: 10,
                instruction: "Arrive at RN 3, on the right",
                name: "-",
                way_points: [460, 460],
              },
            ],
          },
        ],
        bbox: [2.373133, 7.214401, 2.642802, 7.357544],
        geometry:
          "gflk@}noMnApEZ`BPlAFRLL~BnAlEnBbAh@dB|@z@h@~DlDpAvAfF_C|By@`EqAbJcCpJaCbx@kS|FuAn@OtAa@x@UbF}BnB{@`GwCTEd@Id@GxAAj@@pDThBHrBDnH@f_@Klz@[vIGlTGpUCpFEpFHpEF@}@?O@kCA_HCkACcACkAEiD?OScBUqAI[_@cAiB{DUe@k@mAwD{HcBqDw@{A}CmGKSs@{AaC_FS]]eAa@sAIe@Eg@[{AW}@y@iCISw@uBQo@GYEgC@uADk@VsB@e@@cE@cAJiCPuBNgED_CG_CIo@e@}Bo@iC{@uCEOaAiDmAeEwCmJyAcFYuA_@gCwBaXWoBSyAuCsQkBcMYwBWcBOyAEw@E{ABsAJgBrAeMVeCv@_HbAmKDY|@aJ^yFHsF?eC?_BOyPMqOA_A_@wK?w@FgBNsApB{MrEmZdBcLl@iDd@_CrEySV{@\\}@l@mAt@cAr@w@n@i@l@c@`Ai@hAk@|GkCjDqAhC{@`DkAzBy@hN{EpAm@r@c@fA_Aj@m@x@eAl@iA\\eAXeAN_AHoAHkCCcP?}DCoBMyB_@qBk@cBg@kAs@eAi@u@y@y@kDkCsMsKoCgC_@c@_DwCsAkA_@WuGeGyBcCgBgCi@}@y@aBm@wAi@}Ac@{A[uAo@uDmAaIy@gFaAyFe@iB]}@s@uA]g@iAwAmFeGqGiHaBkBeAoAg@w@Yi@Um@Qo@UgAa@{BWaA[w@]o@a@i@w@q@_BmAqFsDgHuE{@g@oBoAcDuBcC_BiBiAUMqIgFwEyCoBeBs@s@u@cAw@mAo@gAqAmCaA{Ba@}@wBwEq@oAk@_A}@oAcAmAyA{AuBeBiAw@mLeHiA_Ay@y@k@u@m@iAi@sAWgAM}@OyAS_IMcIKeFWmGWgCMw@w@{CmAoCoAiBqA_BcBwAgBiA{As@}B}@{LmDeF}A}@]_CkAoA}@_BoAoAuAmA}AqAwB[u@w@yBYeAk@_DiCmS_BmLeAaHc@mBa@sAm@gB[s@eEmJmImQmUcf@mNgZgAwBYk@}EcKaCaFw@{A}@wA}BeDwBgCoAqA}CkCmDgCyBqAyBgA{@a@kCaAyEsA_O_Dwi@iL{\\}Gm`@sIucAkUcDs@cC]uBSsBIkB?gBBuCLoUhAoEPgCD{A?o@G}@Is@Kw@Sw@Uk@W{A{@kAaAq@o@eAeA_@c@wEyEsBsBqCqCaDgDyEiFuA{AqC{C_C}Bk@e@[UaBy@q@Ys@U{AUiEW{DQmDUiBMuEq@qHyAyDaAyLaEkVaIcC{@{@[kEyAmAe@gC}@gAa@oEwAgEyAmAa@HU@SEWQ]m@{Au@_BMYk@sAqC{GcBuDa@cAa@kAaA_Cw@aBu@qB}@wBgA_BGIZgAd@uAn@aCv@sCd@oBfBwGAOCMqAsCg@mAaBwD_A}Bw@oBq@eBG[vEq@pEk@pG{@fBU~Ce@lC_@bFq@XEhIiArEo@nEm@zFy@h@IxAQnC_@fFu@bDe@jAQz@EhBW^ENCp@IbBWp@MPEHAdBSlIoAlAObBWfGw@fJqA~B]bBYnJmAlG{@hAOrDg@tEk@~MkB~@M|@MdIiAzaCq[``@{E`Gw@hGq@fJmA|H_AvV_D~l@{HdPyBth@yGxMmBrZaErHeA`U}Chh@oHlKaBnLaBxF}@~WyDtd@{G~TaD~k@yHzQ{B",
        way_points: [0, 460],
      },
      safetyScore: 48.02,
    },
    {
      route: {
        summary: {
          distance: 58113.2,
          duration: 3441.3,
        },
        segments: [
          {
            distance: 58113.2,
            duration: 3441.3,
            steps: [
              {
                distance: 822.5,
                duration: 197.4,
                type: 11,
                instruction: "Head west",
                name: "-",
                way_points: [0, 12],
              },
              {
                distance: 6005.8,
                duration: 332.6,
                type: 0,
                instruction: "Turn left onto RN 24",
                name: "RN 24",
                way_points: [12, 42],
              },
              {
                distance: 34232.8,
                duration: 1934.3,
                type: 0,
                instruction: "Turn left onto RNIE 4",
                name: "RNIE 4",
                way_points: [42, 369],
              },
              {
                distance: 1598,
                duration: 115,
                type: 1,
                instruction: "Turn right",
                name: "-",
                way_points: [369, 388],
              },
              {
                distance: 15454.1,
                duration: 862,
                type: 1,
                instruction: "Turn right onto RN 3",
                name: "RN 3",
                way_points: [388, 455],
              },
              {
                distance: 0,
                duration: 0,
                type: 10,
                instruction: "Arrive at RN 3, on the right",
                name: "-",
                way_points: [455, 455],
              },
            ],
          },
        ],
        bbox: [2.373133, 7.214401, 2.642802, 7.35899],
        geometry:
          "gflk@}noMnApEZ`BPlAFRLL~BnAlEnBbAh@dB|@z@h@~DlDpAvAfF_C|By@`EqAbJcCpJaCbx@kS|FuAn@OtAa@x@UbF}BnB{@`GwCTEd@Id@GxAAj@@pDThBHrBDnH@f_@Klz@[vIGlTGpUCpFEpFHpEF@}@?O@kCA_HCkACcACkAEiD?OScBUqAI[_@cAiB{DUe@k@mAwD{HcBqDw@{A}CmGKSs@{AaC_FS]]eAa@sAIe@Eg@[{AW}@y@iCISw@uBQo@GYEgC@uADk@VsB@e@@cE@cAJiCPuBNgED_CG_CIo@e@}Bo@iC{@uCEOaAiDmAeEwCmJyAcFYuA_@gCwBaXWoBSyAuCsQkBcMYwBWcBOyAEw@E{ABsAJgBrAeMVeCv@_HbAmKDY|@aJ^yFHsF?eC?_BOyPMqOA_A_@wK?w@FgBNsApB{MrEmZdBcLl@iDd@_CrEySV{@\\}@l@mAt@cAr@w@n@i@l@c@`Ai@hAk@|GkCjDqAhC{@`DkAzBy@hN{EpAm@r@c@fA_Aj@m@x@eAl@iA\\eAXeAN_AHoAHkCCcP?}DCoBMyB_@qBk@cBg@kAs@eAi@u@y@y@kDkCsMsKoCgC_@c@_DwCsAkA_@WuGeGyBcCgBgCi@}@y@aBm@wAi@}Ac@{A[uAo@uDmAaIy@gFaAyFe@iB]}@s@uA]g@iAwAmFeGqGiHaBkBeAoAg@w@Yi@Um@Qo@UgAa@{BWaA[w@]o@a@i@w@q@_BmAqFsDgHuE{@g@oBoAcDuBcC_BiBiAUMqIgFwEyCoBeBs@s@u@cAw@mAo@gAqAmCaA{Ba@}@wBwEq@oAk@_A}@oAcAmAyA{AuBeBiAw@mLeHiA_Ay@y@k@u@m@iAi@sAWgAM}@OyAS_IMcIKeFWmGWgCMw@w@{CmAoCoAiBqA_BcBwAgBiA{As@}B}@{LmDeF}A}@]_CkAoA}@_BoAoAuAmA}AqAwB[u@w@yBYeAk@_DiCmS_BmLeAaHc@mBa@sAm@gB[s@eEmJmImQmUcf@mNgZgAwBYk@}EcKaCaFw@{A}@wA}BeDwBgCoAqA}CkCmDgCyBqAyBgA{@a@kCaAyEsA_O_Dwi@iL{\\}Gm`@sIucAkUcDs@cC]uBSsBIkB?gBBuCLoUhAoEPgCD{A?o@G}@Is@Kw@Sw@Uk@W{A{@kAaAq@o@eAeA_@c@wEyEsBsBqCqCaDgDyEiFuA{AqC{C_C}Bk@e@[UaBy@q@Ys@U{AUiEW{DQmDUiBMuEq@qHyAyDaAyLaEkVaIcC{@{@[kEyAmAe@gC}@gAa@oEwAgEyAmAa@gCw@sAe@uBu@}@[sC_AyEgB_FsB_Be@aBc@zCsLrBaHLm@~AgGZgAd@uAn@aCv@sCd@oBfBwGAOCMqAsCg@mAaBwD_A}Bw@oBq@eBG[vEq@pEk@pG{@fBU~Ce@lC_@bFq@XEhIiArEo@nEm@zFy@h@IxAQnC_@fFu@bDe@jAQz@EhBW^ENCp@IbBWp@MPEHAdBSlIoAlAObBWfGw@fJqA~B]bBYnJmAlG{@hAOrDg@tEk@~MkB~@M|@MdIiAzaCq[``@{E`Gw@hGq@fJmA|H_AvV_D~l@{HdPyBth@yGxMmBrZaErHeA`U}Chh@oHlKaBnLaBxF}@~WyDtd@{G~TaD~k@yHzQ{B",
        way_points: [0, 455],
      },
      safetyScore: 48.02,
    },
  ];
  
  useEffect(() => {
    // Replace this with API call if needed
    setRoutes(paths);
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-6 px-4 gap-10">
      <h1 className="text-3xl font-semibold text-center">Safe Routes</h1>

      {routes.length === 0 ? (
        <p className="text-gray-500 text-lg">Loading routes...</p>
      ) : (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 w-full max-w-7xl">
          {routes.map((routeObj, index) => {
            const geometry = routeObj.route.geometry;
            const coordinates = polyline
              .decode(geometry)
              .map((coord) => [coord[1], coord[0]]); // [lat, lng]
            const summary = routeObj.route.summary;

            return (
              <div
                key={index}
                className="border rounded-2xl shadow-md p-4 bg-white"
              >
                <h2 className="text-xl font-bold mb-2 text-center">
                  Route {index + 1}
                </h2>
                <p className="text-gray-600 mb-4 text-center">
                  Distance: {(summary.distance / 1000).toFixed(2)} km |
                  Duration: {(summary.duration / 60).toFixed(1)} mins
                </p>

                <MapContainer
                  center={coordinates[0]}
                  zoom={11}
                  scrollWheelZoom={false}
                  style={{ height: "350px", width: "100%" }}
                  className="rounded-xl"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <Marker position={coordinates[0]}>
                    <Popup>Start Point</Popup>
                  </Marker>
                  <Marker position={coordinates[coordinates.length - 1]}>
                    <Popup>End Point</Popup>
                  </Marker>
                  <Polyline
                    positions={coordinates}
                    color={index === 0 ? "blue" : "green"}
                    weight={5}
                  />
                </MapContainer>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SafeRoute;
