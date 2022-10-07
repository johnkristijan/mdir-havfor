import fetch, { Headers } from 'node-fetch'

const fetchApiHavforData = async () => {
    const myHeaders = new Headers()
    myHeaders.append('Accept', '*/*')
    myHeaders.append(
        'Accept-Language',
        'nb-NO,nb;q=0.9,no;q=0.8,nn;q=0.7,en-US;q=0.6,en;q=0.5'
    )
    myHeaders.append('Connection', 'keep-alive')
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Origin', 'https://vannmiljo.miljodirektoratet.no')
    myHeaders.append('Referer', 'https://vannmiljo.miljodirektoratet.no/')
    myHeaders.append('Sec-Fetch-Dest', 'empty')
    myHeaders.append('Sec-Fetch-Mode', 'cors')
    myHeaders.append('Sec-Fetch-Site', 'same-site')
    myHeaders.append(
        'User-Agent',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
    )
    myHeaders.append('X-Requested-With', 'XMLHttpRequest')
    myHeaders.append(
        'sec-ch-ua',
        '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"'
    )
    myHeaders.append('sec-ch-ua-mobile', '?0')
    myHeaders.append('sec-ch-ua-platform', '"Windows"')

    const raw = JSON.stringify({
        RegType: 1,
        ParameterIDs: [],
        MediumID: '',
        FromDateSamplingTime: '1900-01-01',
        ToDateSamplingTime: '2100-01-01',
        LatinskNavnID: '',
        ActivityID: 'HAVF',
        AnalysisMethodID: '',
        SamplingMethodID: '',
        RegValueOperator: '',
        RegValue: '',
        RegValue2: '',
        UpperDepthOperator: '',
        UpperDepth: '',
        UpperDepth2: '',
        UpperDepthIncludeNull: '',
        LowerDepthOperator: '',
        LowerDepth: '',
        LowerDepth2: '',
        LowerDepthIncludeNull: '',
        Employer: '',
        Contractor: '',
        ExportEmail: '',
        ExportType: '',
        WaterLocationIDFilter: [],
        WaterLocationQueryFilter: '',
    })

    const url =
        'https://vannmiljowebapi.miljodirektoratet.no/api/Vannmiljo/GetRegistrations'

    const response = await fetch(url, {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    })
    if (response.ok) {
        const body = await response.json()
        // typical response payload:
        // {
        //     "Result": [],
        //     "ResultCount": Int,
        //     "Query": "SQL QUERY..."
        // }
        
        return body.Result
        // lastRecordCount = body.features.length

        // console.warn('last record count: ' + lastRecordCount)
        // globalDataBody = [...globalDataBody, ...body.features]
    } else {
        console.warn('response not ok - request failed')
        console.warn(response)
        return {
            "Result": [],
            "ResultCount": 0,
            "Query": ""
        }
    }
    // return globalDataBody
}

export default fetchApiHavforData
