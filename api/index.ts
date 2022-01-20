var polyUtil = require('polyline-encoded');
const baseUrl = "https://developers.onemap.sg/commonapi";

export const getGeocode = (searchValue: string): Promise<Response> => {
    return fetch(`${baseUrl}/search?searchVal=${searchValue}&returnGeom=Y&getAddrDetails=Y&pageNum=1`)
        .then(response => {
            if (!response.ok) throw response;
            return response.json();
        })
}

// export const getRoute = (from: { longitude: number, latitude: number}, to: { longitude: number, latitude: number}): Promise<Response> {
//     return fetch(`${baseUrl}/search?searchVal=${searchValue}&returnGeom=Y&getAddrDetails=Y&pageNum=1`)
//         .then(response => {
//             if (!response.ok) throw response;
//             return response.json();
//         })
// }

export const testFunction = () => {
    let encoded = "yr`oAm`k{dEksAstD~e@iW`e@{UxtAqr@pd@sVrOmItC}GZ}GJwDeSmWkm@gb@qKuEyCwE}AgHJiH\\kE{BaRoCoEsGcLiE{N{AmQvB{QbFkN|E}FzMcPtQmTh|A_iBfCcDzHcKpJaMr\\w_@t\\i`@hb@gg@lAkJRqJg@wJeCoMgQ{f@qHsTuC_FiMsT_S_ViVkPkfAyi@oXiNq{@q_@qn@cU{SsGgEqAiDeAcTsGcd@eMoF{AoBi@uGkB}d@uMwDoA_EsA{QiG_VyJaSkLkQuN}CgDqJkKqDsFqE_H}CuE}CyEsBsGcDeKuK}f@}FiJ_FaEkKiEgHcAe~@xMsr@`LqMrB_En@gAy`@kBkVwE{W_^gbAkHg[aFeQaRe^_Nea@iEwYJkYsAyj@KiRkGglAcDqn@KiUrDkc@nFkY`Lo]lIeQfJgOfcAyhAzJ}KtPsTjIuQxFaQrBcN|E{u@rDgh@hBuYjDy_@zHoUbI}O|PwSkDuBiP_K{]cTq_Ack@ixAe|@_L}G{LoHynBujAsh@iZiRqK}|@ig@xg@wo@v{@_gA~q@g}@fUgZp^{`@gDqLv`@oNfTwH~LcIl@gEy@{PqU_V_`@cuAvHwJt^_MvXgMxCaD"

    var latlngs = polyUtil.decode(encoded, {
        precision: 6
    });

    return latlngs.map((xy: number[][]) => {
        return { latitude: xy[0], longitude: xy[1] };
    })
}

export const mapToCoords = (coords: number[][]): { latitude: number, longitude: number }[] => {
    return coords.map(xy => {
        return { latitude: xy[1], longitude: xy[0] };
    })
}