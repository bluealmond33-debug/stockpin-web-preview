import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D-QAa1jW.js";
import { l as MarketNamedPanel, u as init_MarketNamedPanel } from "./MarketDataHelp-Cdenoayw.js";
import { a as init_MarketHeatmap, i as MARKET_UNIVERSES, n as IndependentHeatmapPanels, o as init_marketSnapshot, r as init_HeatmapExplorer, s as parseMarketSnapshot } from "./HeatmapExplorer-DYXQrlKJ.js";
var kospi_default;
function init_kospi() {
	return (init_kospi = __esmMin((() => {
		kospi_default = {
			market: "kospi",
			asOf: "2026-11-20T11:20:17Z",
			sourceLabel: "Npay 코스피 시장 공급자 명부 · 우선주 포함",
			sourceUrl: "https://stock.naver.com/market/stock/kr",
			universeSize: 937,
			rows: [
				{
					"symbol": "005930",
					"name": "삼성전자",
					"sector": "반도체와반도체장비",
					"marketCap": "1057591800187200",
					"changePct": "-8.13"
				},
				{
					"symbol": "000660",
					"name": "SK하이닉스",
					"sector": "업종 미확인",
					"marketCap": "777479002300000",
					"changePct": "-7.02"
				},
				{
					"symbol": "005935",
					"name": "삼성전자우",
					"sector": "반도체와반도체장비",
					"marketCap": "114257659307200",
					"changePct": "-9.59"
				},
				{
					"symbol": "402340",
					"name": "SK스퀘어",
					"sector": "업종 미확인",
					"marketCap": "88652926656000",
					"changePct": "-9.07"
				},
				{
					"symbol": "373220",
					"name": "LG에너지솔루션",
					"sector": "업종 미확인",
					"marketCap": "69615000000000",
					"changePct": "-1.49"
				},
				{
					"symbol": "207940",
					"name": "삼성바이오로직스",
					"sector": "업종 미확인",
					"marketCap": "61844710536000",
					"changePct": "-2.84"
				},
				{
					"symbol": "009150",
					"name": "삼성전기",
					"sector": "업종 미확인",
					"marketCap": "57290064832000",
					"changePct": "-13.33"
				},
				{
					"symbol": "105560",
					"name": "KB금융",
					"sector": "업종 미확인",
					"marketCap": "54302692075400",
					"changePct": "0.13"
				},
				{
					"symbol": "005380",
					"name": "현대차",
					"sector": "업종 미확인",
					"marketCap": "51477022476000",
					"changePct": "-5.42"
				},
				{
					"symbol": "068270",
					"name": "셀트리온",
					"sector": "업종 미확인",
					"marketCap": "49327452662500",
					"changePct": "-1.16"
				},
				{
					"symbol": "032830",
					"name": "삼성생명",
					"sector": "업종 미확인",
					"marketCap": "47500000000000",
					"changePct": "-7.05"
				},
				{
					"symbol": "028260",
					"name": "삼성물산",
					"sector": "업종 미확인",
					"marketCap": "41433816945500",
					"changePct": "-6.24"
				},
				{
					"symbol": "055550",
					"name": "신한지주",
					"sector": "업종 미확인",
					"marketCap": "39949281694900",
					"changePct": "0.82"
				},
				{
					"symbol": "000270",
					"name": "기아",
					"sector": "업종 미확인",
					"marketCap": "34122096025200",
					"changePct": "-4.48"
				},
				{
					"symbol": "086790",
					"name": "하나금융지주",
					"sector": "업종 미확인",
					"marketCap": "33420258136800",
					"changePct": "0.24"
				},
				{
					"symbol": "034730",
					"name": "SK",
					"sector": "업종 미확인",
					"marketCap": "33097483919500",
					"changePct": "-7.50"
				},
				{
					"symbol": "006400",
					"name": "삼성SDI",
					"sector": "업종 미확인",
					"marketCap": "32113333705000",
					"changePct": "-7.00"
				},
				{
					"symbol": "012450",
					"name": "한화에어로스페이스",
					"sector": "업종 미확인",
					"marketCap": "31092730803000",
					"changePct": "-4.44"
				},
				{
					"symbol": "012330",
					"name": "현대모비스",
					"sector": "업종 미확인",
					"marketCap": "28922228370000",
					"changePct": "-5.71"
				},
				{
					"symbol": "329180",
					"name": "HD현대중공업",
					"sector": "업종 미확인",
					"marketCap": "25925422575000",
					"changePct": "-5.54"
				},
				{
					"symbol": "034020",
					"name": "두산에너빌리티",
					"sector": "업종 미확인",
					"marketCap": "25782586126500",
					"changePct": "-8.11"
				},
				{
					"symbol": "035420",
					"name": "NAVER",
					"sector": "업종 미확인",
					"marketCap": "24461948275200",
					"changePct": "-4.46"
				},
				{
					"symbol": "316140",
					"name": "우리금융지주",
					"sector": "업종 미확인",
					"marketCap": "23464824637800",
					"changePct": "0.31"
				},
				{
					"symbol": "000810",
					"name": "삼성화재",
					"sector": "업종 미확인",
					"marketCap": "22636268811000",
					"changePct": "-3.43"
				},
				{
					"symbol": "138040",
					"name": "메리츠금융지주",
					"sector": "업종 미확인",
					"marketCap": "21069021670700",
					"changePct": "0.56"
				},
				{
					"symbol": "066570",
					"name": "LG전자",
					"sector": "업종 미확인",
					"marketCap": "20963252910600",
					"changePct": "-5.30"
				},
				{
					"symbol": "011200",
					"name": "HMM",
					"sector": "업종 미확인",
					"marketCap": "20656911543000",
					"changePct": "-2.88"
				},
				{
					"symbol": "005490",
					"name": "POSCO홀딩스",
					"sector": "업종 미확인",
					"marketCap": "19968864804000",
					"changePct": "-2.89"
				},
				{
					"symbol": "033780",
					"name": "KT&G",
					"sector": "업종 미확인",
					"marketCap": "18800073581600",
					"changePct": "-0.77"
				},
				{
					"symbol": "015760",
					"name": "한국전력",
					"sector": "업종 미확인",
					"marketCap": "16402182167350",
					"changePct": "1.19"
				},
				{
					"symbol": "010120",
					"name": "LS ELECTRIC",
					"sector": "업종 미확인",
					"marketCap": "16260000000000",
					"changePct": "-10.26"
				},
				{
					"symbol": "018260",
					"name": "삼성에스디에스",
					"sector": "업종 미확인",
					"marketCap": "15978515700000",
					"changePct": "-3.73"
				},
				{
					"symbol": "096770",
					"name": "SK이노베이션",
					"sector": "업종 미확인",
					"marketCap": "15924772629600",
					"changePct": "-4.17"
				},
				{
					"symbol": "180640",
					"name": "한진칼",
					"sector": "업종 미확인",
					"marketCap": "15822659175000",
					"changePct": "9.72"
				},
				{
					"symbol": "009540",
					"name": "HD한국조선해양",
					"sector": "업종 미확인",
					"marketCap": "15676245194000",
					"changePct": "-4.11"
				},
				{
					"symbol": "010130",
					"name": "고려아연",
					"sector": "업종 미확인",
					"marketCap": "15487742998000",
					"changePct": "-6.31"
				},
				{
					"symbol": "298040",
					"name": "효성중공업",
					"sector": "업종 미확인",
					"marketCap": "15394828748000",
					"changePct": "-8.07"
				},
				{
					"symbol": "024110",
					"name": "기업은행",
					"sector": "업종 미확인",
					"marketCap": "15238808356590",
					"changePct": "-0.62"
				},
				{
					"symbol": "086280",
					"name": "현대글로비스",
					"sector": "업종 미확인",
					"marketCap": "15187500000000",
					"changePct": "-0.49"
				},
				{
					"symbol": "017670",
					"name": "SK텔레콤",
					"sector": "업종 미확인",
					"marketCap": "14863471667600",
					"changePct": "-13.72"
				},
				{
					"symbol": "042700",
					"name": "한미반도체",
					"sector": "업종 미확인",
					"marketCap": "14449329520000",
					"changePct": "-12.06"
				},
				{
					"symbol": "051910",
					"name": "LG화학",
					"sector": "업종 미확인",
					"marketCap": "14259652882000",
					"changePct": "-3.58"
				},
				{
					"symbol": "003670",
					"name": "포스코퓨처엠",
					"sector": "업종 미확인",
					"marketCap": "14017924272000",
					"changePct": "-5.06"
				},
				{
					"symbol": "267260",
					"name": "HD현대일렉트릭",
					"sector": "업종 미확인",
					"marketCap": "13914194110000",
					"changePct": "-7.10"
				},
				{
					"symbol": "035720",
					"name": "카카오",
					"sector": "업종 미확인",
					"marketCap": "13577965631500",
					"changePct": "-3.92"
				},
				{
					"symbol": "003550",
					"name": "LG",
					"sector": "업종 미확인",
					"marketCap": "13259538750800",
					"changePct": "-2.88"
				},
				{
					"symbol": "010140",
					"name": "삼성중공업",
					"sector": "업종 미확인",
					"marketCap": "13226400000000",
					"changePct": "-6.93"
				},
				{
					"symbol": "042660",
					"name": "한화오션",
					"sector": "업종 미확인",
					"marketCap": "12838721208600",
					"changePct": "-6.89"
				},
				{
					"symbol": "030200",
					"name": "KT",
					"sector": "업종 미확인",
					"marketCap": "11555194257250",
					"changePct": "-3.07"
				},
				{
					"symbol": "003490",
					"name": "대한항공",
					"sector": "업종 미확인",
					"marketCap": "11525305061700",
					"changePct": "-3.54"
				},
				{
					"symbol": "028050",
					"name": "삼성E&A",
					"sector": "업종 미확인",
					"marketCap": "11524800000000",
					"changePct": "-7.26"
				},
				{
					"symbol": "010950",
					"name": "S-Oil",
					"sector": "업종 미확인",
					"marketCap": "10920530824000",
					"changePct": "-3.96"
				},
				{
					"symbol": "005830",
					"name": "DB손해보험",
					"sector": "업종 미확인",
					"marketCap": "10774807410500",
					"changePct": "-2.37"
				},
				{
					"symbol": "323410",
					"name": "카카오뱅크",
					"sector": "업종 미확인",
					"marketCap": "10329657461050",
					"changePct": "0.93"
				},
				{
					"symbol": "006800",
					"name": "미래에셋증권",
					"sector": "업종 미확인",
					"marketCap": "10208795758800",
					"changePct": "-6.47"
				},
				{
					"symbol": "047810",
					"name": "한국항공우주",
					"sector": "업종 미확인",
					"marketCap": "9776753232100",
					"changePct": "-3.46"
				},
				{
					"symbol": "003230",
					"name": "삼양식품",
					"sector": "업종 미확인",
					"marketCap": "9197811315000",
					"changePct": "-2.32"
				},
				{
					"symbol": "259960",
					"name": "크래프톤",
					"sector": "업종 미확인",
					"marketCap": "9187494290000",
					"changePct": "2.49"
				},
				{
					"symbol": "267250",
					"name": "HD현대",
					"sector": "업종 미확인",
					"marketCap": "8878822754000",
					"changePct": "-4.83"
				},
				{
					"symbol": "272210",
					"name": "한화시스템",
					"sector": "업종 미확인",
					"marketCap": "8728075771800",
					"changePct": "-5.81"
				},
				{
					"symbol": "278470",
					"name": "에이피알",
					"sector": "업종 미확인",
					"marketCap": "8704371037500",
					"changePct": "-4.52"
				},
				{
					"symbol": "0126Z0",
					"name": "삼성에피스홀딩스",
					"sector": "업종 미확인",
					"marketCap": "8597093429500",
					"changePct": "-2.54"
				},
				{
					"symbol": "005940",
					"name": "NH투자증권",
					"sector": "업종 미확인",
					"marketCap": "8307137362500",
					"changePct": "-3.85"
				},
				{
					"symbol": "443060",
					"name": "HD현대마린솔루션",
					"sector": "업종 미확인",
					"marketCap": "8222456564000",
					"changePct": "-0.38"
				},
				{
					"symbol": "047050",
					"name": "포스코인터내셔널",
					"sector": "업종 미확인",
					"marketCap": "8180409642000",
					"changePct": "-3.63"
				},
				{
					"symbol": "090430",
					"name": "아모레퍼시픽",
					"sector": "업종 미확인",
					"marketCap": "8101247121500",
					"changePct": "-2.81"
				},
				{
					"symbol": "000720",
					"name": "현대건설",
					"sector": "업종 미확인",
					"marketCap": "7973072774000",
					"changePct": "-9.94"
				},
				{
					"symbol": "307950",
					"name": "현대오토에버",
					"sector": "업종 미확인",
					"marketCap": "7939242789000",
					"changePct": "-6.16"
				},
				{
					"symbol": "352820",
					"name": "하이브",
					"sector": "업종 미확인",
					"marketCap": "7905793722400",
					"changePct": "-3.17"
				},
				{
					"symbol": "079550",
					"name": "LIG디펜스앤에어로스페이스",
					"sector": "업종 미확인",
					"marketCap": "7612000000000",
					"changePct": "-6.74"
				},
				{
					"symbol": "161390",
					"name": "한국타이어앤테크놀로지",
					"sector": "업종 미확인",
					"marketCap": "7593541729700",
					"changePct": "-2.85"
				},
				{
					"symbol": "021240",
					"name": "코웨이",
					"sector": "업종 미확인",
					"marketCap": "7529654126400",
					"changePct": "-0.84"
				},
				{
					"symbol": "000150",
					"name": "두산",
					"sector": "업종 미확인",
					"marketCap": "7374978898000",
					"changePct": "-15.36"
				},
				{
					"symbol": "078930",
					"name": "GS",
					"sector": "업종 미확인",
					"marketCap": "6976451674500",
					"changePct": "-7.40"
				},
				{
					"symbol": "064400",
					"name": "LG씨엔에스",
					"sector": "업종 미확인",
					"marketCap": "6859525118400",
					"changePct": "-5.60"
				},
				{
					"symbol": "071050",
					"name": "한국금융지주",
					"sector": "업종 미확인",
					"marketCap": "6742845032000",
					"changePct": "-3.35"
				},
				{
					"symbol": "326030",
					"name": "SK바이오팜",
					"sector": "업종 미확인",
					"marketCap": "6734939500000",
					"changePct": "-1.26"
				},
				{
					"symbol": "064350",
					"name": "현대로템",
					"sector": "업종 미확인",
					"marketCap": "6657679873000",
					"changePct": "-8.41"
				},
				{
					"symbol": "032640",
					"name": "LG유플러스",
					"sector": "업종 미확인",
					"marketCap": "6370660257320",
					"changePct": "-1.12"
				},
				{
					"symbol": "011070",
					"name": "LG이노텍",
					"sector": "업종 미확인",
					"marketCap": "6282926608500",
					"changePct": "-9.39"
				},
				{
					"symbol": "016360",
					"name": "삼성증권",
					"sector": "업종 미확인",
					"marketCap": "6170630000000",
					"changePct": "-4.29"
				},
				{
					"symbol": "000500",
					"name": "가온전선",
					"sector": "업종 미확인",
					"marketCap": "6149075845500",
					"changePct": "-5.49"
				},
				{
					"symbol": "000100",
					"name": "유한양행",
					"sector": "업종 미확인",
					"marketCap": "5918708792400",
					"changePct": "-1.11"
				},
				{
					"symbol": "128940",
					"name": "한미약품",
					"sector": "업종 미확인",
					"marketCap": "5758540454500",
					"changePct": "6.52"
				},
				{
					"symbol": "006260",
					"name": "LS",
					"sector": "업종 미확인",
					"marketCap": "5182320000000",
					"changePct": "-8.74"
				},
				{
					"symbol": "007660",
					"name": "이수페타시스",
					"sector": "업종 미확인",
					"marketCap": "5028531501500",
					"changePct": "-17.47"
				},
				{
					"symbol": "039490",
					"name": "키움증권",
					"sector": "업종 미확인",
					"marketCap": "4936169071200",
					"changePct": "-3.29"
				},
				{
					"symbol": "241560",
					"name": "두산밥캣",
					"sector": "업종 미확인",
					"marketCap": "4811974463000",
					"changePct": "-3.09"
				},
				{
					"symbol": "175330",
					"name": "JB금융지주",
					"sector": "업종 미확인",
					"marketCap": "4793610876800",
					"changePct": "0.19"
				},
				{
					"symbol": "029780",
					"name": "삼성카드",
					"sector": "업종 미확인",
					"marketCap": "4790765142850",
					"changePct": "-0.84"
				},
				{
					"symbol": "005387",
					"name": "현대차2우B",
					"sector": "업종 미확인",
					"marketCap": "4744601009500",
					"changePct": "-4.15"
				},
				{
					"symbol": "088980",
					"name": "맥쿼리인프라",
					"sector": "업종 미확인",
					"marketCap": "4612018792590",
					"changePct": "0.10"
				},
				{
					"symbol": "271560",
					"name": "오리온",
					"sector": "업종 미확인",
					"marketCap": "4605103802000",
					"changePct": "-1.52"
				},
				{
					"symbol": "377300",
					"name": "카카오페이",
					"sector": "업종 미확인",
					"marketCap": "4526872961250",
					"changePct": "-2.48"
				},
				{
					"symbol": "009830",
					"name": "한화솔루션",
					"sector": "업종 미확인",
					"marketCap": "4304443139040",
					"changePct": "-7.98"
				},
				{
					"symbol": "047040",
					"name": "대우건설",
					"sector": "업종 미확인",
					"marketCap": "4244449487600",
					"changePct": "-8.75"
				},
				{
					"symbol": "012750",
					"name": "에스원",
					"sector": "업종 미확인",
					"marketCap": "4024112950200",
					"changePct": "0.09"
				},
				{
					"symbol": "138930",
					"name": "BNK금융지주",
					"sector": "업종 미확인",
					"marketCap": "3958232787900",
					"changePct": "-2.86"
				},
				{
					"symbol": "036570",
					"name": "NC",
					"sector": "업종 미확인",
					"marketCap": "3864997546800",
					"changePct": "-2.55"
				},
				{
					"symbol": "051900",
					"name": "LG생활건강",
					"sector": "업종 미확인",
					"marketCap": "3781319557500",
					"changePct": "-0.39"
				},
				{
					"symbol": "267270",
					"name": "HD건설기계",
					"sector": "업종 미확인",
					"marketCap": "3719045323800",
					"changePct": "-14.24"
				},
				{
					"symbol": "004020",
					"name": "현대제철",
					"sector": "업종 미확인",
					"marketCap": "3663086798250",
					"changePct": "-3.68"
				},
				{
					"symbol": "353200",
					"name": "대덕전자",
					"sector": "업종 미확인",
					"marketCap": "3577785370000",
					"changePct": "-14.62"
				},
				{
					"symbol": "008930",
					"name": "한미사이언스",
					"sector": "업종 미확인",
					"marketCap": "3515325670000",
					"changePct": "0.39"
				},
				{
					"symbol": "000880",
					"name": "한화",
					"sector": "업종 미확인",
					"marketCap": "3509041422600",
					"changePct": "-6.27"
				},
				{
					"symbol": "036460",
					"name": "한국가스공사",
					"sector": "업종 미확인",
					"marketCap": "3452506200000",
					"changePct": "-1.97"
				},
				{
					"symbol": "034220",
					"name": "LG디스플레이",
					"sector": "업종 미확인",
					"marketCap": "3400000000000",
					"changePct": "-4.09"
				},
				{
					"symbol": "001040",
					"name": "CJ",
					"sector": "업종 미확인",
					"marketCap": "3317424672600",
					"changePct": "-0.44"
				},
				{
					"symbol": "001440",
					"name": "대한전선",
					"sector": "업종 미확인",
					"marketCap": "3288755760880",
					"changePct": "-7.45"
				},
				{
					"symbol": "011790",
					"name": "SKC",
					"sector": "업종 미확인",
					"marketCap": "3248688519000",
					"changePct": "-7.75"
				},
				{
					"symbol": "192820",
					"name": "코스맥스",
					"sector": "업종 미확인",
					"marketCap": "3189212029000",
					"changePct": "-3.27"
				},
				{
					"symbol": "111770",
					"name": "영원무역",
					"sector": "업종 미확인",
					"marketCap": "3154976521600",
					"changePct": "1.28"
				},
				{
					"symbol": "062040",
					"name": "산일전기",
					"sector": "업종 미확인",
					"marketCap": "3137827840000",
					"changePct": "-11.57"
				},
				{
					"symbol": "022100",
					"name": "포스코DX",
					"sector": "업종 미확인",
					"marketCap": "3131915417400",
					"changePct": "-7.00"
				},
				{
					"symbol": "005385",
					"name": "현대차우",
					"sector": "업종 미확인",
					"marketCap": "3115244646800",
					"changePct": "-4.21"
				},
				{
					"symbol": "454910",
					"name": "두산로보틱스",
					"sector": "업종 미확인",
					"marketCap": "3062744055000",
					"changePct": "-6.80"
				},
				{
					"symbol": "035250",
					"name": "강원랜드",
					"sector": "업종 미확인",
					"marketCap": "3044373315000",
					"changePct": "0.71"
				},
				{
					"symbol": "088350",
					"name": "한화생명",
					"sector": "업종 미확인",
					"marketCap": "3031169700000",
					"changePct": "-5.16"
				},
				{
					"symbol": "302440",
					"name": "SK바이오사이언스",
					"sector": "업종 미확인",
					"marketCap": "3020577290500",
					"changePct": "0.79"
				},
				{
					"symbol": "018880",
					"name": "한온시스템",
					"sector": "업종 미확인",
					"marketCap": "2996653918640",
					"changePct": "-3.63"
				},
				{
					"symbol": "002380",
					"name": "KCC",
					"sector": "업종 미확인",
					"marketCap": "2943066880000",
					"changePct": "-4.99"
				},
				{
					"symbol": "000990",
					"name": "DB하이텍",
					"sector": "업종 미확인",
					"marketCap": "2927858772400",
					"changePct": "-11.33"
				},
				{
					"symbol": "010060",
					"name": "OCI홀딩스",
					"sector": "업종 미확인",
					"marketCap": "2889829588800",
					"changePct": "-8.59"
				},
				{
					"symbol": "001450",
					"name": "현대해상",
					"sector": "업종 미확인",
					"marketCap": "2817454662500",
					"changePct": "-3.92"
				},
				{
					"symbol": "009420",
					"name": "한올바이오파마",
					"sector": "업종 미확인",
					"marketCap": "2784426005400",
					"changePct": "-1.30"
				},
				{
					"symbol": "066970",
					"name": "엘앤에프",
					"sector": "업종 미확인",
					"marketCap": "2770839656700",
					"changePct": "-6.46"
				},
				{
					"symbol": "097950",
					"name": "CJ제일제당",
					"sector": "업종 미확인",
					"marketCap": "2747388945000",
					"changePct": "-1.30"
				},
				{
					"symbol": "026960",
					"name": "동서",
					"sector": "업종 미확인",
					"marketCap": "2746735000000",
					"changePct": "-0.54"
				},
				{
					"symbol": "004170",
					"name": "신세계",
					"sector": "업종 미확인",
					"marketCap": "2739102490000",
					"changePct": "-1.86"
				},
				{
					"symbol": "161890",
					"name": "한국콜마",
					"sector": "업종 미확인",
					"marketCap": "2728746901200",
					"changePct": "-2.53"
				},
				{
					"symbol": "031210",
					"name": "서울보증보험",
					"sector": "업종 미확인",
					"marketCap": "2660202883800",
					"changePct": "-3.91"
				},
				{
					"symbol": "251270",
					"name": "넷마블",
					"sector": "업종 미확인",
					"marketCap": "2656911678750",
					"changePct": "-2.29"
				},
				{
					"symbol": "028670",
					"name": "팬오션",
					"sector": "업종 미확인",
					"marketCap": "2606026371000",
					"changePct": "-4.41"
				},
				{
					"symbol": "103590",
					"name": "일진전기",
					"sector": "업종 미확인",
					"marketCap": "2508251514000",
					"changePct": "-6.24"
				},
				{
					"symbol": "139130",
					"name": "iM금융지주",
					"sector": "업종 미확인",
					"marketCap": "2479970969280",
					"changePct": "-1.14"
				},
				{
					"symbol": "282330",
					"name": "BGF리테일",
					"sector": "업종 미확인",
					"marketCap": "2468141776800",
					"changePct": "1.28"
				},
				{
					"symbol": "006360",
					"name": "GS건설",
					"sector": "업종 미확인",
					"marketCap": "2417677092500",
					"changePct": "-6.30"
				},
				{
					"symbol": "052690",
					"name": "한전기술",
					"sector": "업종 미확인",
					"marketCap": "2384928000000",
					"changePct": "-7.00"
				},
				{
					"symbol": "383220",
					"name": "F&F",
					"sector": "업종 미확인",
					"marketCap": "2325239452500",
					"changePct": "-0.82"
				},
				{
					"symbol": "023530",
					"name": "롯데쇼핑",
					"sector": "업종 미확인",
					"marketCap": "2274415902000",
					"changePct": "-5.19"
				},
				{
					"symbol": "011780",
					"name": "금호석유화학",
					"sector": "업종 미확인",
					"marketCap": "2270184396700",
					"changePct": "-2.04"
				},
				{
					"symbol": "017800",
					"name": "현대엘리베이터",
					"sector": "업종 미확인",
					"marketCap": "2251211313000",
					"changePct": "-7.93"
				},
				{
					"symbol": "004990",
					"name": "롯데지주",
					"sector": "업종 미확인",
					"marketCap": "2212535827200",
					"changePct": "-2.20"
				},
				{
					"symbol": "007340",
					"name": "DN오토모티브",
					"sector": "업종 미확인",
					"marketCap": "2170753091500",
					"changePct": "-3.26"
				},
				{
					"symbol": "279570",
					"name": "케이뱅크",
					"sector": "업종 미확인",
					"marketCap": "2170469057850",
					"changePct": "-2.01"
				},
				{
					"symbol": "003690",
					"name": "코리안리",
					"sector": "업종 미확인",
					"marketCap": "2168367050370",
					"changePct": "-3.39"
				},
				{
					"symbol": "085620",
					"name": "미래에셋생명",
					"sector": "업종 미확인",
					"marketCap": "2143954800000",
					"changePct": "-5.76"
				},
				{
					"symbol": "007810",
					"name": "코리아써키트",
					"sector": "업종 미확인",
					"marketCap": "2129656656000",
					"changePct": "-10.48"
				},
				{
					"symbol": "069960",
					"name": "현대백화점",
					"sector": "업종 미확인",
					"marketCap": "2124143832000",
					"changePct": "0.92"
				},
				{
					"symbol": "089860",
					"name": "롯데렌탈",
					"sector": "업종 미확인",
					"marketCap": "2124099198000",
					"changePct": "-0.34"
				},
				{
					"symbol": "005440",
					"name": "현대지에프홀딩스",
					"sector": "업종 미확인",
					"marketCap": "2110901760490",
					"changePct": "-2.29"
				},
				{
					"symbol": "002790",
					"name": "아모레퍼시픽홀딩스",
					"sector": "업종 미확인",
					"marketCap": "2102599950000",
					"changePct": "-1.61"
				},
				{
					"symbol": "004370",
					"name": "농심",
					"sector": "업종 미확인",
					"marketCap": "2074180922000",
					"changePct": "-0.29"
				},
				{
					"symbol": "457190",
					"name": "이수스페셜티케미컬",
					"sector": "업종 미확인",
					"marketCap": "2012576875200",
					"changePct": "-11.90"
				},
				{
					"symbol": "009970",
					"name": "영원무역홀딩스",
					"sector": "업종 미확인",
					"marketCap": "1991668783900",
					"changePct": "-0.85"
				},
				{
					"symbol": "181710",
					"name": "NHN",
					"sector": "업종 미확인",
					"marketCap": "1978532658000",
					"changePct": "-4.52"
				},
				{
					"symbol": "018670",
					"name": "SK가스",
					"sector": "업종 미확인",
					"marketCap": "1965079728000",
					"changePct": "0.00"
				},
				{
					"symbol": "020150",
					"name": "롯데에너지머티리얼즈",
					"sector": "업종 미확인",
					"marketCap": "1958468316200",
					"changePct": "-3.61"
				},
				{
					"symbol": "011170",
					"name": "롯데케미칼",
					"sector": "업종 미확인",
					"marketCap": "1939865251650",
					"changePct": "-1.95"
				},
				{
					"symbol": "004800",
					"name": "효성",
					"sector": "업종 미확인",
					"marketCap": "1925146805000",
					"changePct": "-5.66"
				},
				{
					"symbol": "030000",
					"name": "제일기획",
					"sector": "업종 미확인",
					"marketCap": "1908091179000",
					"changePct": "-0.32"
				},
				{
					"symbol": "001720",
					"name": "신영증권",
					"sector": "업종 미확인",
					"marketCap": "1903752000000",
					"changePct": "-1.53"
				},
				{
					"symbol": "007070",
					"name": "GS리테일",
					"sector": "업종 미확인",
					"marketCap": "1839363130000",
					"changePct": "0.23"
				},
				{
					"symbol": "014680",
					"name": "한솔케미칼",
					"sector": "업종 미확인",
					"marketCap": "1834986120000",
					"changePct": "-4.12"
				},
				{
					"symbol": "000240",
					"name": "한국앤컴퍼니",
					"sector": "업종 미확인",
					"marketCap": "1827503370000",
					"changePct": "-2.78"
				},
				{
					"symbol": "375500",
					"name": "DL이앤씨",
					"sector": "업종 미확인",
					"marketCap": "1801188150650",
					"changePct": "-7.82"
				},
				{
					"symbol": "082740",
					"name": "한화엔진",
					"sector": "업종 미확인",
					"marketCap": "1798285910100",
					"changePct": "-9.64"
				},
				{
					"symbol": "450080",
					"name": "에코프로머티",
					"sector": "업종 미확인",
					"marketCap": "1780968830500",
					"changePct": "-6.33"
				},
				{
					"symbol": "020560",
					"name": "아시아나항공",
					"sector": "업종 미확인",
					"marketCap": "1750921043500",
					"changePct": "-3.08"
				},
				{
					"symbol": "139480",
					"name": "이마트",
					"sector": "업종 미확인",
					"marketCap": "1715687577000",
					"changePct": "-1.85"
				},
				{
					"symbol": "081660",
					"name": "미스토홀딩스",
					"sector": "업종 미확인",
					"marketCap": "1672392960000",
					"changePct": "0.64"
				},
				{
					"symbol": "005850",
					"name": "에스엘",
					"sector": "업종 미확인",
					"marketCap": "1653567312000",
					"changePct": "-5.94"
				},
				{
					"symbol": "489790",
					"name": "한화비전",
					"sector": "업종 미확인",
					"marketCap": "1653494772500",
					"changePct": "-12.32"
				},
				{
					"symbol": "112610",
					"name": "씨에스윈드",
					"sector": "업종 미확인",
					"marketCap": "1644684717000",
					"changePct": "-5.91"
				},
				{
					"symbol": "462870",
					"name": "시프트업",
					"sector": "업종 미확인",
					"marketCap": "1609527786000",
					"changePct": "1.48"
				},
				{
					"symbol": "294870",
					"name": "IPARK현대산업개발",
					"sector": "업종 미확인",
					"marketCap": "1598252752500",
					"changePct": "-2.61"
				},
				{
					"symbol": "000120",
					"name": "CJ대한통운",
					"sector": "업종 미확인",
					"marketCap": "1592301611200",
					"changePct": "-2.10"
				},
				{
					"symbol": "281820",
					"name": "케이씨텍",
					"sector": "업종 미확인",
					"marketCap": "1579933147800",
					"changePct": "-4.55"
				},
				{
					"symbol": "336260",
					"name": "두산퓨얼셀",
					"sector": "업종 미확인",
					"marketCap": "1548926619900",
					"changePct": "-7.62"
				},
				{
					"symbol": "483650",
					"name": "달바글로벌",
					"sector": "업종 미확인",
					"marketCap": "1544624928000",
					"changePct": "-6.17"
				},
				{
					"symbol": "051600",
					"name": "한전KPS",
					"sector": "업종 미확인",
					"marketCap": "1532250000000",
					"changePct": "-2.16"
				},
				{
					"symbol": "006280",
					"name": "녹십자",
					"sector": "업종 미확인",
					"marketCap": "1521587247600",
					"changePct": "-1.36"
				},
				{
					"symbol": "395400",
					"name": "SK리츠",
					"sector": "업종 미확인",
					"marketCap": "1491542307100",
					"changePct": "-0.10"
				},
				{
					"symbol": "008770",
					"name": "호텔신라",
					"sector": "업종 미확인",
					"marketCap": "1481616567750",
					"changePct": "-2.08"
				},
				{
					"symbol": "204320",
					"name": "HL만도",
					"sector": "업종 미확인",
					"marketCap": "1472105712000",
					"changePct": "-5.14"
				},
				{
					"symbol": "073240",
					"name": "금호타이어",
					"sector": "업종 미확인",
					"marketCap": "1453537052220",
					"changePct": "-4.17"
				},
				{
					"symbol": "001800",
					"name": "오리온홀딩스",
					"sector": "업종 미확인",
					"marketCap": "1398642159000",
					"changePct": "-1.69"
				},
				{
					"symbol": "006040",
					"name": "동원산업",
					"sector": "업종 미확인",
					"marketCap": "1381607634700",
					"changePct": "-1.88"
				},
				{
					"symbol": "439260",
					"name": "대한조선",
					"sector": "업종 미확인",
					"marketCap": "1375003153000",
					"changePct": "-3.22"
				},
				{
					"symbol": "011210",
					"name": "현대위아",
					"sector": "업종 미확인",
					"marketCap": "1332559067000",
					"changePct": "-1.41"
				},
				{
					"symbol": "103140",
					"name": "풍산",
					"sector": "업종 미확인",
					"marketCap": "1307332568700",
					"changePct": "-7.26"
				},
				{
					"symbol": "280360",
					"name": "롯데웰푸드",
					"sector": "업종 미확인",
					"marketCap": "1302447221000",
					"changePct": "1.51"
				},
				{
					"symbol": "001120",
					"name": "LX인터내셔널",
					"sector": "업종 미확인",
					"marketCap": "1267452000000",
					"changePct": "-3.40"
				},
				{
					"symbol": "023590",
					"name": "다우기술",
					"sector": "업종 미확인",
					"marketCap": "1248838951200",
					"changePct": "-2.37"
				},
				{
					"symbol": "415640",
					"name": "KB발해인프라",
					"sector": "업종 미확인",
					"marketCap": "1224230024520",
					"changePct": "0.00"
				},
				{
					"symbol": "192080",
					"name": "더블유게임즈",
					"sector": "업종 미확인",
					"marketCap": "1185714208000",
					"changePct": "-1.41"
				},
				{
					"symbol": "007310",
					"name": "오뚜기",
					"sector": "업종 미확인",
					"marketCap": "1182309850000",
					"changePct": "-1.34"
				},
				{
					"symbol": "000080",
					"name": "하이트진로",
					"sector": "업종 미확인",
					"marketCap": "1142476523190",
					"changePct": "-0.61"
				},
				{
					"symbol": "069620",
					"name": "대웅제약",
					"sector": "업종 미확인",
					"marketCap": "1141277637500",
					"changePct": "-1.40"
				},
				{
					"symbol": "300720",
					"name": "한일시멘트",
					"sector": "업종 미확인",
					"marketCap": "1123770793520",
					"changePct": "-1.36"
				},
				{
					"symbol": "229640",
					"name": "LS에코에너지",
					"sector": "업종 미확인",
					"marketCap": "1104026887950",
					"changePct": "-6.97"
				},
				{
					"symbol": "012630",
					"name": "HDC",
					"sector": "업종 미확인",
					"marketCap": "1100093280930",
					"changePct": "-3.56"
				},
				{
					"symbol": "298020",
					"name": "효성티앤씨",
					"sector": "업종 미확인",
					"marketCap": "1097067387000",
					"changePct": "-3.61"
				},
				{
					"symbol": "001430",
					"name": "세아베스틸지주",
					"sector": "업종 미확인",
					"marketCap": "1086622205700",
					"changePct": "-4.87"
				},
				{
					"symbol": "006120",
					"name": "SK디스커버리",
					"sector": "업종 미확인",
					"marketCap": "1086618062400",
					"changePct": "-7.00"
				},
				{
					"symbol": "000815",
					"name": "삼성화재우",
					"sector": "업종 미확인",
					"marketCap": "1076513160000",
					"changePct": "-1.24"
				},
				{
					"symbol": "120110",
					"name": "코오롱인더",
					"sector": "업종 미확인",
					"marketCap": "1066078739200",
					"changePct": "-4.30"
				},
				{
					"symbol": "071970",
					"name": "HD현대마린엔진",
					"sector": "업종 미확인",
					"marketCap": "1056654569250",
					"changePct": "-9.84"
				},
				{
					"symbol": "034230",
					"name": "파라다이스",
					"sector": "업종 미확인",
					"marketCap": "1053196073340",
					"changePct": "-1.73"
				},
				{
					"symbol": "330590",
					"name": "롯데리츠",
					"sector": "업종 미확인",
					"marketCap": "1035953449140",
					"changePct": "-4.65"
				},
				{
					"symbol": "001740",
					"name": "SK네트웍스",
					"sector": "업종 미확인",
					"marketCap": "1002969445000",
					"changePct": "-5.66"
				},
				{
					"symbol": "005070",
					"name": "코스모신소재",
					"sector": "업종 미확인",
					"marketCap": "989794215800",
					"changePct": "-5.99"
				},
				{
					"symbol": "475150",
					"name": "SK이터닉스",
					"sector": "업종 미확인",
					"marketCap": "974316314400",
					"changePct": "-8.19"
				},
				{
					"symbol": "005300",
					"name": "롯데칠성",
					"sector": "업종 미확인",
					"marketCap": "972427043200",
					"changePct": "-1.41"
				},
				{
					"symbol": "003090",
					"name": "대웅",
					"sector": "업종 미확인",
					"marketCap": "965738287800",
					"changePct": "1.90"
				},
				{
					"symbol": "030190",
					"name": "NICE평가정보",
					"sector": "업종 미확인",
					"marketCap": "964347663550",
					"changePct": "-0.72"
				},
				{
					"symbol": "003240",
					"name": "태광산업",
					"sector": "업종 미확인",
					"marketCap": "946390000000",
					"changePct": "-1.73"
				},
				{
					"symbol": "192400",
					"name": "쿠쿠홀딩스",
					"sector": "업종 미확인",
					"marketCap": "926394919250",
					"changePct": "-2.07"
				},
				{
					"symbol": "097230",
					"name": "HJ중공업",
					"sector": "업종 미확인",
					"marketCap": "921915462240",
					"changePct": "-6.24"
				},
				{
					"symbol": "003540",
					"name": "대신증권",
					"sector": "업종 미확인",
					"marketCap": "901038035060",
					"changePct": "-4.22"
				},
				{
					"symbol": "361610",
					"name": "SK아이이테크놀로지",
					"sector": "업종 미확인",
					"marketCap": "895568745000",
					"changePct": "-4.53"
				},
				{
					"symbol": "137310",
					"name": "에스디바이오센서",
					"sector": "업종 미확인",
					"marketCap": "892335863780",
					"changePct": "0.54"
				},
				{
					"symbol": "00680K",
					"name": "미래에셋증권2우B",
					"sector": "업종 미확인",
					"marketCap": "888352627000",
					"changePct": "-3.99"
				},
				{
					"symbol": "079160",
					"name": "CJ CGV",
					"sector": "업종 미확인",
					"marketCap": "887523850880",
					"changePct": "0.56"
				},
				{
					"symbol": "003530",
					"name": "한화투자증권",
					"sector": "업종 미확인",
					"marketCap": "883589568500",
					"changePct": "-6.57"
				},
				{
					"symbol": "009450",
					"name": "경동나비엔",
					"sector": "업종 미확인",
					"marketCap": "878486097600",
					"changePct": "-2.11"
				},
				{
					"symbol": "093370",
					"name": "후성",
					"sector": "업종 미확인",
					"marketCap": "859115193300",
					"changePct": "-10.60"
				},
				{
					"symbol": "451800",
					"name": "한화리츠",
					"sector": "업종 미확인",
					"marketCap": "846814000000",
					"changePct": "-3.87"
				},
				{
					"symbol": "030610",
					"name": "교보증권",
					"sector": "업종 미확인",
					"marketCap": "845605170620",
					"changePct": "-1.98"
				},
				{
					"symbol": "185750",
					"name": "종근당",
					"sector": "업종 미확인",
					"marketCap": "844730136000",
					"changePct": "-1.29"
				},
				{
					"symbol": "066575",
					"name": "LG전자우",
					"sector": "업종 미확인",
					"marketCap": "837588326250",
					"changePct": "-5.34"
				},
				{
					"symbol": "000210",
					"name": "DL",
					"sector": "업종 미확인",
					"marketCap": "835091977400",
					"changePct": "-2.80"
				},
				{
					"symbol": "032350",
					"name": "롯데관광개발",
					"sector": "업종 미확인",
					"marketCap": "823563981140",
					"changePct": "-6.35"
				},
				{
					"symbol": "009155",
					"name": "삼성전기우",
					"sector": "업종 미확인",
					"marketCap": "808141552000",
					"changePct": "-10.32"
				},
				{
					"symbol": "004000",
					"name": "롯데정밀화학",
					"sector": "업종 미확인",
					"marketCap": "799800000000",
					"changePct": "-2.52"
				},
				{
					"symbol": "000400",
					"name": "롯데손해보험",
					"sector": "업종 미확인",
					"marketCap": "780495844800",
					"changePct": "1.41"
				},
				{
					"symbol": "322000",
					"name": "HD현대에너지솔루션",
					"sector": "업종 미확인",
					"marketCap": "773920000000",
					"changePct": "-8.96"
				},
				{
					"symbol": "071320",
					"name": "지역난방공사",
					"sector": "업종 미확인",
					"marketCap": "756091983200",
					"changePct": "0.00"
				},
				{
					"symbol": "009240",
					"name": "한샘",
					"sector": "업종 미확인",
					"marketCap": "749555606800",
					"changePct": "-3.63"
				},
				{
					"symbol": "051915",
					"name": "LG화학우",
					"sector": "업종 미확인",
					"marketCap": "746764174800",
					"changePct": "-4.42"
				},
				{
					"symbol": "003850",
					"name": "보령",
					"sector": "업종 미확인",
					"marketCap": "737769980200",
					"changePct": "-1.94"
				},
				{
					"symbol": "000155",
					"name": "두산우",
					"sector": "업종 미확인",
					"marketCap": "736211190000",
					"changePct": "-9.49"
				},
				{
					"symbol": "003570",
					"name": "SNT다이내믹스",
					"sector": "업종 미확인",
					"marketCap": "721379516100",
					"changePct": "0.00"
				},
				{
					"symbol": "001820",
					"name": "삼화콘덴서",
					"sector": "업종 미확인",
					"marketCap": "719334000000",
					"changePct": "-12.29"
				},
				{
					"symbol": "003160",
					"name": "디아이",
					"sector": "업종 미확인",
					"marketCap": "707500000000",
					"changePct": "-12.74"
				},
				{
					"symbol": "298050",
					"name": "HS효성첨단소재",
					"sector": "업종 미확인",
					"marketCap": "702903841200",
					"changePct": "-3.21"
				},
				{
					"symbol": "000370",
					"name": "한화손해보험",
					"sector": "업종 미확인",
					"marketCap": "691094376800",
					"changePct": "-2.31"
				},
				{
					"symbol": "365550",
					"name": "ESR켄달스퀘어리츠",
					"sector": "업종 미확인",
					"marketCap": "685357865000",
					"changePct": "-3.80"
				},
				{
					"symbol": "003470",
					"name": "유안타증권",
					"sector": "업종 미확인",
					"marketCap": "684977762610",
					"changePct": "-4.95"
				},
				{
					"symbol": "005180",
					"name": "빙그레",
					"sector": "업종 미확인",
					"marketCap": "682587037200",
					"changePct": "-0.13"
				},
				{
					"symbol": "089590",
					"name": "제주항공",
					"sector": "업종 미확인",
					"marketCap": "678997093700",
					"changePct": "0.72"
				},
				{
					"symbol": "214320",
					"name": "이노션",
					"sector": "업종 미확인",
					"marketCap": "674800000000",
					"changePct": "-1.40"
				},
				{
					"symbol": "453340",
					"name": "현대그린푸드",
					"sector": "업종 미확인",
					"marketCap": "672161850900",
					"changePct": "-1.19"
				},
				{
					"symbol": "293940",
					"name": "신한알파리츠",
					"sector": "업종 미확인",
					"marketCap": "671217682650",
					"changePct": "-2.63"
				},
				{
					"symbol": "285130",
					"name": "SK케미칼",
					"sector": "업종 미확인",
					"marketCap": "666002491000",
					"changePct": "-1.28"
				},
				{
					"symbol": "195870",
					"name": "해성디에스",
					"sector": "업종 미확인",
					"marketCap": "658750000000",
					"changePct": "-10.20"
				},
				{
					"symbol": "0220W0",
					"name": "한화머시너리앤서비스홀딩스",
					"sector": "업종 미확인",
					"marketCap": "657530862300",
					"changePct": "-0.13"
				},
				{
					"symbol": "094800",
					"name": "맵스리얼티",
					"sector": "업종 미확인",
					"marketCap": "655410376860",
					"changePct": "1.73"
				},
				{
					"symbol": "017960",
					"name": "한국카본",
					"sector": "업종 미확인",
					"marketCap": "646472839860",
					"changePct": "-6.08"
				},
				{
					"symbol": "093050",
					"name": "LF",
					"sector": "업종 미확인",
					"marketCap": "646204000000",
					"changePct": "1.14"
				},
				{
					"symbol": "268280",
					"name": "미원에스씨",
					"sector": "업종 미확인",
					"marketCap": "646000000000",
					"changePct": "1.49"
				},
				{
					"symbol": "001570",
					"name": "금양",
					"sector": "업종 미확인",
					"marketCap": "633275240400",
					"changePct": "0.00"
				},
				{
					"symbol": "005880",
					"name": "대한해운",
					"sector": "업종 미확인",
					"marketCap": "626129839600",
					"changePct": "-2.66"
				},
				{
					"symbol": "000640",
					"name": "동아제약",
					"sector": "업종 미확인",
					"marketCap": "621412242100",
					"changePct": "1.21"
				},
				{
					"symbol": "004490",
					"name": "세방전지",
					"sector": "업종 미확인",
					"marketCap": "611226000000",
					"changePct": "-5.36"
				},
				{
					"symbol": "064960",
					"name": "SNT모티브",
					"sector": "업종 미확인",
					"marketCap": "603007081600",
					"changePct": "0.00"
				},
				{
					"symbol": "317450",
					"name": "명인제약",
					"sector": "업종 미확인",
					"marketCap": "600790000000",
					"changePct": "-3.06"
				},
				{
					"symbol": "071055",
					"name": "한국금융지주우",
					"sector": "업종 미확인",
					"marketCap": "594612476500",
					"changePct": "-3.61"
				},
				{
					"symbol": "014820",
					"name": "동원시스템즈",
					"sector": "업종 미확인",
					"marketCap": "587073460500",
					"changePct": "-1.46"
				},
				{
					"symbol": "006340",
					"name": "대원전선",
					"sector": "업종 미확인",
					"marketCap": "579482534240",
					"changePct": "-8.65"
				},
				{
					"symbol": "100090",
					"name": "SK오션플랜트",
					"sector": "업종 미확인",
					"marketCap": "579172255830",
					"changePct": "-4.92"
				},
				{
					"symbol": "002350",
					"name": "넥센타이어",
					"sector": "업종 미확인",
					"marketCap": "577217153070",
					"changePct": "-2.15"
				},
				{
					"symbol": "001680",
					"name": "대상",
					"sector": "업종 미확인",
					"marketCap": "576889616250",
					"changePct": "-1.94"
				},
				{
					"symbol": "001060",
					"name": "JW중외제약",
					"sector": "업종 미확인",
					"marketCap": "565375282000",
					"changePct": "-2.13"
				},
				{
					"symbol": "079900",
					"name": "전진건설로봇",
					"sector": "업종 미확인",
					"marketCap": "561812982500",
					"changePct": "-13.09"
				},
				{
					"symbol": "002840",
					"name": "미원상사",
					"sector": "업종 미확인",
					"marketCap": "554850000000",
					"changePct": "7.69"
				},
				{
					"symbol": "002960",
					"name": "한국쉘석유",
					"sector": "업종 미확인",
					"marketCap": "547300000000",
					"changePct": "-3.33"
				},
				{
					"symbol": "006650",
					"name": "대한유화",
					"sector": "업종 미확인",
					"marketCap": "546000000000",
					"changePct": "-4.65"
				},
				{
					"symbol": "383800",
					"name": "LX홀딩스",
					"sector": "업종 미확인",
					"marketCap": "530150795500",
					"changePct": "-2.52"
				},
				{
					"symbol": "036530",
					"name": "SNT홀딩스",
					"sector": "업종 미확인",
					"marketCap": "529555146300",
					"changePct": "-3.27"
				},
				{
					"symbol": "011810",
					"name": "STX",
					"sector": "업종 미확인",
					"marketCap": "526303849320",
					"changePct": "0.00"
				},
				{
					"symbol": "017940",
					"name": "E1",
					"sector": "업종 미확인",
					"marketCap": "526162000000",
					"changePct": "-1.16"
				},
				{
					"symbol": "077970",
					"name": "STX엔진",
					"sector": "업종 미확인",
					"marketCap": "513895206400",
					"changePct": "-8.18"
				},
				{
					"symbol": "007700",
					"name": "F&F홀딩스",
					"sector": "업종 미확인",
					"marketCap": "512398207700",
					"changePct": "-2.46"
				},
				{
					"symbol": "284740",
					"name": "쿠쿠홈시스",
					"sector": "업종 미확인",
					"marketCap": "508205524500",
					"changePct": "-0.88"
				},
				{
					"symbol": "003300",
					"name": "한일홀딩스",
					"sector": "업종 미확인",
					"marketCap": "506252310480",
					"changePct": "-2.49"
				},
				{
					"symbol": "006110",
					"name": "삼아알미늄",
					"sector": "업종 미확인",
					"marketCap": "502098706000",
					"changePct": "-8.92"
				},
				{
					"symbol": "090460",
					"name": "비에이치",
					"sector": "업종 미확인",
					"marketCap": "498256531640",
					"changePct": "-6.40"
				},
				{
					"symbol": "039130",
					"name": "하나투어",
					"sector": "업종 미확인",
					"marketCap": "495683050200",
					"changePct": "-5.85"
				},
				{
					"symbol": "499790",
					"name": "GS피앤엘",
					"sector": "업종 미확인",
					"marketCap": "488830230650",
					"changePct": "-5.56"
				},
				{
					"symbol": "100840",
					"name": "SNT에너지",
					"sector": "업종 미확인",
					"marketCap": "488099367600",
					"changePct": "-5.73"
				},
				{
					"symbol": "00104K",
					"name": "CJ4우(전환)",
					"sector": "업종 미확인",
					"marketCap": "486471531200",
					"changePct": "0.26"
				},
				{
					"symbol": "029460",
					"name": "케이씨",
					"sector": "업종 미확인",
					"marketCap": "479944299250",
					"changePct": "-2.24"
				},
				{
					"symbol": "058650",
					"name": "세아홀딩스",
					"sector": "업종 미확인",
					"marketCap": "479734418800",
					"changePct": "-3.35"
				},
				{
					"symbol": "001530",
					"name": "DI동일",
					"sector": "업종 미확인",
					"marketCap": "478530845100",
					"changePct": "-2.74"
				},
				{
					"symbol": "114090",
					"name": "GKL",
					"sector": "업종 미확인",
					"marketCap": "473195875500",
					"changePct": "-5.32"
				},
				{
					"symbol": "248070",
					"name": "솔루엠",
					"sector": "업종 미확인",
					"marketCap": "472424411680",
					"changePct": "-5.36"
				},
				{
					"symbol": "012030",
					"name": "DB",
					"sector": "업종 미확인",
					"marketCap": "471752872885",
					"changePct": "-2.90"
				},
				{
					"symbol": "005810",
					"name": "풍산홀딩스",
					"sector": "업종 미확인",
					"marketCap": "470003719200",
					"changePct": "-2.54"
				},
				{
					"symbol": "005690",
					"name": "파미셀",
					"sector": "업종 미확인",
					"marketCap": "467431269060",
					"changePct": "-7.81"
				},
				{
					"symbol": "000670",
					"name": "영풍",
					"sector": "업종 미확인",
					"marketCap": "465790279900",
					"changePct": "-5.24"
				},
				{
					"symbol": "069260",
					"name": "TKG휴켐스",
					"sector": "업종 미확인",
					"marketCap": "463563187920",
					"changePct": "-3.49"
				},
				{
					"symbol": "009410",
					"name": "태영건설",
					"sector": "업종 미확인",
					"marketCap": "459139277450",
					"changePct": "-1.90"
				},
				{
					"symbol": "377740",
					"name": "바이오노트",
					"sector": "업종 미확인",
					"marketCap": "452883483360",
					"changePct": "-0.56"
				},
				{
					"symbol": "004700",
					"name": "조광피혁",
					"sector": "업종 미확인",
					"marketCap": "449481728800",
					"changePct": "-2.03"
				},
				{
					"symbol": "456040",
					"name": "OCI",
					"sector": "업종 미확인",
					"marketCap": "437329380750",
					"changePct": "-6.42"
				},
				{
					"symbol": "003030",
					"name": "세아제강지주",
					"sector": "업종 미확인",
					"marketCap": "436530647800",
					"changePct": "0.38"
				},
				{
					"symbol": "005250",
					"name": "녹십자홀딩스",
					"sector": "업종 미확인",
					"marketCap": "435481224600",
					"changePct": "-3.04"
				},
				{
					"symbol": "004690",
					"name": "삼천리",
					"sector": "업종 미확인",
					"marketCap": "434125206900",
					"changePct": "-1.72"
				},
				{
					"symbol": "104700",
					"name": "한국철강",
					"sector": "업종 미확인",
					"marketCap": "433390500000",
					"changePct": "-8.11"
				},
				{
					"symbol": "448730",
					"name": "삼성FN리츠",
					"sector": "업종 미확인",
					"marketCap": "428845500000",
					"changePct": "-1.46"
				},
				{
					"symbol": "025540",
					"name": "한국단자",
					"sector": "업종 미확인",
					"marketCap": "427864500000",
					"changePct": "-5.16"
				},
				{
					"symbol": "005090",
					"name": "SGC에너지",
					"sector": "업종 미확인",
					"marketCap": "425795790150",
					"changePct": "-5.44"
				},
				{
					"symbol": "016380",
					"name": "KG스틸",
					"sector": "업종 미확인",
					"marketCap": "423537678795",
					"changePct": "-3.86"
				},
				{
					"symbol": "001500",
					"name": "현대차증권",
					"sector": "업종 미확인",
					"marketCap": "422938020960",
					"changePct": "-3.80"
				},
				{
					"symbol": "034310",
					"name": "NICE",
					"sector": "업종 미확인",
					"marketCap": "417193731950",
					"changePct": "-3.32"
				},
				{
					"symbol": "460860",
					"name": "동국제강",
					"sector": "업종 미확인",
					"marketCap": "416707342800",
					"changePct": "-3.56"
				},
				{
					"symbol": "003545",
					"name": "대신증권우",
					"sector": "업종 미확인",
					"marketCap": "413034017520",
					"changePct": "-1.07"
				},
				{
					"symbol": "272450",
					"name": "진에어",
					"sector": "업종 미확인",
					"marketCap": "411858000000",
					"changePct": "-2.71"
				},
				{
					"symbol": "336370",
					"name": "솔루스첨단소재",
					"sector": "업종 미확인",
					"marketCap": "409337697340",
					"changePct": "-5.36"
				},
				{
					"symbol": "090435",
					"name": "아모레퍼시픽우",
					"sector": "업종 미확인",
					"marketCap": "405420672000",
					"changePct": "-1.29"
				},
				{
					"symbol": "145990",
					"name": "삼양사",
					"sector": "업종 미확인",
					"marketCap": "405318545700",
					"changePct": "-2.48"
				},
				{
					"symbol": "161000",
					"name": "애경케미칼",
					"sector": "업종 미확인",
					"marketCap": "400865362160",
					"changePct": "-6.58"
				},
				{
					"symbol": "001270",
					"name": "부국증권",
					"sector": "업종 미확인",
					"marketCap": "400796093900",
					"changePct": "-1.65"
				},
				{
					"symbol": "003620",
					"name": "KG모빌리티",
					"sector": "업종 미확인",
					"marketCap": "400702325760",
					"changePct": "-4.35"
				},
				{
					"symbol": "001940",
					"name": "KISCO홀딩스",
					"sector": "업종 미확인",
					"marketCap": "396938640000",
					"changePct": "1.27"
				},
				{
					"symbol": "178920",
					"name": "PI첨단소재",
					"sector": "업종 미확인",
					"marketCap": "392921388360",
					"changePct": "-6.30"
				},
				{
					"symbol": "019170",
					"name": "신풍제약",
					"sector": "업종 미확인",
					"marketCap": "390517988900",
					"changePct": "-0.93"
				},
				{
					"symbol": "008060",
					"name": "대덕",
					"sector": "업종 미확인",
					"marketCap": "387960015200",
					"changePct": "-5.27"
				},
				{
					"symbol": "000070",
					"name": "삼양홀딩스",
					"sector": "업종 미확인",
					"marketCap": "381172678100",
					"changePct": "-2.00"
				},
				{
					"symbol": "002240",
					"name": "고려제강",
					"sector": "업종 미확인",
					"marketCap": "378810000000",
					"changePct": "-1.75"
				},
				{
					"symbol": "020000",
					"name": "한섬",
					"sector": "업종 미확인",
					"marketCap": "377995094400",
					"changePct": "-1.46"
				},
				{
					"symbol": "010780",
					"name": "아이에스동서",
					"sector": "업종 미확인",
					"marketCap": "376314296880",
					"changePct": "-3.28"
				},
				{
					"symbol": "017900",
					"name": "광전자",
					"sector": "업종 미확인",
					"marketCap": "376055021870",
					"changePct": "-10.48"
				},
				{
					"symbol": "029530",
					"name": "신도리코",
					"sector": "업종 미확인",
					"marketCap": "375512925850",
					"changePct": "-0.26"
				},
				{
					"symbol": "249420",
					"name": "일동제약",
					"sector": "업종 미확인",
					"marketCap": "373647756120",
					"changePct": "-3.91"
				},
				{
					"symbol": "002030",
					"name": "아세아",
					"sector": "업종 미확인",
					"marketCap": "372652212000",
					"changePct": "0.95"
				},
				{
					"symbol": "003000",
					"name": "부광약품",
					"sector": "업종 미확인",
					"marketCap": "371965809670",
					"changePct": "-3.33"
				},
				{
					"symbol": "002990",
					"name": "금호건설",
					"sector": "업종 미확인",
					"marketCap": "371109341040",
					"changePct": "-1.58"
				},
				{
					"symbol": "001510",
					"name": "SK증권",
					"sector": "업종 미확인",
					"marketCap": "370997316340",
					"changePct": "-5.59"
				},
				{
					"symbol": "072710",
					"name": "농심홀딩스",
					"sector": "업종 미확인",
					"marketCap": "370559421000",
					"changePct": "-1.11"
				},
				{
					"symbol": "005945",
					"name": "NH투자증권우",
					"sector": "업종 미확인",
					"marketCap": "369116134080",
					"changePct": "-1.61"
				},
				{
					"symbol": "403550",
					"name": "쏘카",
					"sector": "업종 미확인",
					"marketCap": "368255474520",
					"changePct": "-1.71"
				},
				{
					"symbol": "108320",
					"name": "LX세미콘",
					"sector": "업종 미확인",
					"marketCap": "365133535000",
					"changePct": "-5.47"
				},
				{
					"symbol": "016590",
					"name": "신대양제지",
					"sector": "업종 미확인",
					"marketCap": "365098249200",
					"changePct": "-4.53"
				},
				{
					"symbol": "003280",
					"name": "흥아해운",
					"sector": "업종 미확인",
					"marketCap": "364724571783",
					"changePct": "-2.19"
				},
				{
					"symbol": "452260",
					"name": "한화갤러리아",
					"sector": "업종 미확인",
					"marketCap": "363486768750",
					"changePct": "-3.90"
				},
				{
					"symbol": "002810",
					"name": "삼영무역",
					"sector": "업종 미확인",
					"marketCap": "361398172360",
					"changePct": "-1.16"
				},
				{
					"symbol": "126560",
					"name": "현대퓨처넷",
					"sector": "업종 미확인",
					"marketCap": "352719359200",
					"changePct": "-1.97"
				},
				{
					"symbol": "075580",
					"name": "세진중공업",
					"sector": "업종 미확인",
					"marketCap": "347350176160",
					"changePct": "-7.42"
				},
				{
					"symbol": "031430",
					"name": "신세계인터내셔날",
					"sector": "업종 미확인",
					"marketCap": "343912380000",
					"changePct": "-2.48"
				},
				{
					"symbol": "014830",
					"name": "유니드",
					"sector": "업종 미확인",
					"marketCap": "343794080000",
					"changePct": "-4.15"
				},
				{
					"symbol": "005610",
					"name": "삼립",
					"sector": "업종 미확인",
					"marketCap": "341277305950",
					"changePct": "-3.30"
				},
				{
					"symbol": "192650",
					"name": "드림텍",
					"sector": "업종 미확인",
					"marketCap": "340634905930",
					"changePct": "-7.51"
				},
				{
					"symbol": "344820",
					"name": "KCC글라스",
					"sector": "업종 미확인",
					"marketCap": "340171905600",
					"changePct": "-2.74"
				},
				{
					"symbol": "005430",
					"name": "한국공항",
					"sector": "업종 미확인",
					"marketCap": "338799985000",
					"changePct": "-4.55"
				},
				{
					"symbol": "145720",
					"name": "덴티움",
					"sector": "업종 미확인",
					"marketCap": "338487721750",
					"changePct": "-3.92"
				},
				{
					"symbol": "016610",
					"name": "DB증권",
					"sector": "업종 미확인",
					"marketCap": "337448792550",
					"changePct": "-3.64"
				},
				{
					"symbol": "009160",
					"name": "SIMPAC",
					"sector": "업종 미확인",
					"marketCap": "333391936800",
					"changePct": "-4.14"
				},
				{
					"symbol": "015360",
					"name": "INVENI",
					"sector": "업종 미확인",
					"marketCap": "333112500000",
					"changePct": "-1.63"
				},
				{
					"symbol": "00088K",
					"name": "한화3우B",
					"sector": "업종 미확인",
					"marketCap": "327288469900",
					"changePct": "-2.19"
				},
				{
					"symbol": "027410",
					"name": "BGF",
					"sector": "업종 미확인",
					"marketCap": "323522753580",
					"changePct": "-1.74"
				},
				{
					"symbol": "271940",
					"name": "일진하이솔루스",
					"sector": "업종 미확인",
					"marketCap": "323187391000",
					"changePct": "-5.72"
				},
				{
					"symbol": "170900",
					"name": "동아에스티",
					"sector": "업종 미확인",
					"marketCap": "322965649200",
					"changePct": "-2.35"
				},
				{
					"symbol": "092230",
					"name": "KPX홀딩스",
					"sector": "업종 미확인",
					"marketCap": "319853529000",
					"changePct": "-2.64"
				},
				{
					"symbol": "001200",
					"name": "유진투자증권",
					"sector": "업종 미확인",
					"marketCap": "318690515220",
					"changePct": "-4.78"
				},
				{
					"symbol": "009900",
					"name": "명신산업",
					"sector": "업종 미확인",
					"marketCap": "318493707310",
					"changePct": "-7.19"
				},
				{
					"symbol": "357120",
					"name": "코람코라이프인프라리츠",
					"sector": "업종 미확인",
					"marketCap": "318286607580",
					"changePct": "0.77"
				},
				{
					"symbol": "005389",
					"name": "현대차3우B",
					"sector": "업종 미확인",
					"marketCap": "316014128600",
					"changePct": "-4.49"
				},
				{
					"symbol": "194370",
					"name": "제이에스코퍼레이션",
					"sector": "업종 미확인",
					"marketCap": "314831824300",
					"changePct": "-3.56"
				},
				{
					"symbol": "006220",
					"name": "제주은행",
					"sector": "업종 미확인",
					"marketCap": "310704138540",
					"changePct": "-2.49"
				},
				{
					"symbol": "298690",
					"name": "에어부산",
					"sector": "업종 미확인",
					"marketCap": "309538256800",
					"changePct": "-3.46"
				},
				{
					"symbol": "005720",
					"name": "넥센",
					"sector": "업종 미확인",
					"marketCap": "308958584760",
					"changePct": "-3.61"
				},
				{
					"symbol": "015860",
					"name": "일진홀딩스",
					"sector": "업종 미확인",
					"marketCap": "305954394600",
					"changePct": "-4.47"
				},
				{
					"symbol": "484870",
					"name": "엠앤씨솔루션",
					"sector": "업종 미확인",
					"marketCap": "305648721000",
					"changePct": "-11.10"
				},
				{
					"symbol": "306200",
					"name": "세아제강",
					"sector": "업종 미확인",
					"marketCap": "304902250000",
					"changePct": "-3.93"
				},
				{
					"symbol": "183190",
					"name": "아세아시멘트",
					"sector": "업종 미확인",
					"marketCap": "301497919360",
					"changePct": "-3.01"
				},
				{
					"symbol": "105630",
					"name": "한세실업",
					"sector": "업종 미확인",
					"marketCap": "296800000000",
					"changePct": "-2.37"
				},
				{
					"symbol": "009290",
					"name": "광동제약",
					"sector": "업종 미확인",
					"marketCap": "294316865280",
					"changePct": "-3.11"
				},
				{
					"symbol": "002900",
					"name": "TYM",
					"sector": "업종 미확인",
					"marketCap": "293112000000",
					"changePct": "-3.80"
				},
				{
					"symbol": "017810",
					"name": "풀무원",
					"sector": "업종 미확인",
					"marketCap": "290478530040",
					"changePct": "-3.67"
				},
				{
					"symbol": "005420",
					"name": "코스모화학",
					"sector": "업종 미확인",
					"marketCap": "289598039120",
					"changePct": "-8.16"
				},
				{
					"symbol": "060980",
					"name": "HL홀딩스",
					"sector": "업종 미확인",
					"marketCap": "287498738700",
					"changePct": "-3.02"
				},
				{
					"symbol": "0120G0",
					"name": "삼양바이오팜",
					"sector": "업종 미확인",
					"marketCap": "286280995000",
					"changePct": "-5.52"
				},
				{
					"symbol": "024720",
					"name": "콜마홀딩스",
					"sector": "업종 미확인",
					"marketCap": "285687837470",
					"changePct": "-2.80"
				},
				{
					"symbol": "002320",
					"name": "한진",
					"sector": "업종 미확인",
					"marketCap": "284816975390",
					"changePct": "1.22"
				},
				{
					"symbol": "130660",
					"name": "한전산업",
					"sector": "업종 미확인",
					"marketCap": "284272000000",
					"changePct": "-3.65"
				},
				{
					"symbol": "011760",
					"name": "현대코퍼레이션",
					"sector": "업종 미확인",
					"marketCap": "283099872400",
					"changePct": "-3.39"
				},
				{
					"symbol": "033240",
					"name": "자화전자",
					"sector": "업종 미확인",
					"marketCap": "281303636040",
					"changePct": "-7.86"
				},
				{
					"symbol": "244920",
					"name": "에이플러스에셋",
					"sector": "업종 미확인",
					"marketCap": "279431085480",
					"changePct": "3.69"
				},
				{
					"symbol": "001750",
					"name": "한양증권",
					"sector": "업종 미확인",
					"marketCap": "276956878380",
					"changePct": "-1.13"
				},
				{
					"symbol": "016800",
					"name": "퍼시스",
					"sector": "업종 미확인",
					"marketCap": "274275000000",
					"changePct": "-2.65"
				},
				{
					"symbol": "122900",
					"name": "아이마켓코리아",
					"sector": "업종 미확인",
					"marketCap": "274116488000",
					"changePct": "-0.36"
				},
				{
					"symbol": "381970",
					"name": "KG모빌리티플랫폼",
					"sector": "업종 미확인",
					"marketCap": "270955706400",
					"changePct": "-1.77"
				},
				{
					"symbol": "004710",
					"name": "한솔테크닉스",
					"sector": "업종 미확인",
					"marketCap": "270521936700",
					"changePct": "-12.82"
				},
				{
					"symbol": "037710",
					"name": "광주신세계",
					"sector": "업종 미확인",
					"marketCap": "268476454400",
					"changePct": "-2.09"
				},
				{
					"symbol": "025860",
					"name": "남해화학",
					"sector": "업종 미확인",
					"marketCap": "267768963770",
					"changePct": "-4.43"
				},
				{
					"symbol": "006405",
					"name": "삼성SDI우",
					"sector": "업종 미확인",
					"marketCap": "267438208800",
					"changePct": "-6.45"
				},
				{
					"symbol": "084690",
					"name": "대상홀딩스",
					"sector": "업종 미확인",
					"marketCap": "266886405060",
					"changePct": "-2.77"
				},
				{
					"symbol": "096760",
					"name": "JW홀딩스",
					"sector": "업종 미확인",
					"marketCap": "266869040620",
					"changePct": "-1.77"
				},
				{
					"symbol": "003350",
					"name": "한국화장품제조",
					"sector": "업종 미확인",
					"marketCap": "265122000000",
					"changePct": "-7.87"
				},
				{
					"symbol": "017390",
					"name": "서울가스",
					"sector": "업종 미확인",
					"marketCap": "264825000000",
					"changePct": "-1.47"
				},
				{
					"symbol": "007690",
					"name": "국도화학",
					"sector": "업종 미확인",
					"marketCap": "264396753600",
					"changePct": "-1.89"
				},
				{
					"symbol": "123890",
					"name": "한국자산신탁",
					"sector": "업종 미확인",
					"marketCap": "264327680160",
					"changePct": "-5.26"
				},
				{
					"symbol": "091810",
					"name": "트리니티항공",
					"sector": "업종 미확인",
					"marketCap": "263433714780",
					"changePct": "-2.46"
				},
				{
					"symbol": "026890",
					"name": "스틱인베스트먼트",
					"sector": "업종 미확인",
					"marketCap": "260540024640",
					"changePct": "-5.35"
				},
				{
					"symbol": "134380",
					"name": "미원화학",
					"sector": "업종 미확인",
					"marketCap": "260393331200",
					"changePct": "0.51"
				},
				{
					"symbol": "005500",
					"name": "삼진제약",
					"sector": "업종 미확인",
					"marketCap": "259340400000",
					"changePct": "2.20"
				},
				{
					"symbol": "018250",
					"name": "애경산업",
					"sector": "업종 미확인",
					"marketCap": "258289164300",
					"changePct": "-1.51"
				},
				{
					"symbol": "033270",
					"name": "유나이티드제약",
					"sector": "업종 미확인",
					"marketCap": "258231878250",
					"changePct": "1.63"
				},
				{
					"symbol": "126720",
					"name": "수산인더스트리",
					"sector": "업종 미확인",
					"marketCap": "256290840000",
					"changePct": "-2.39"
				},
				{
					"symbol": "010955",
					"name": "S-Oil우",
					"sector": "업종 미확인",
					"marketCap": "254587979100",
					"changePct": "-2.31"
				},
				{
					"symbol": "02826K",
					"name": "삼성물산우B",
					"sector": "업종 미확인",
					"marketCap": "253599552000",
					"changePct": "-3.19"
				},
				{
					"symbol": "084010",
					"name": "대한제강",
					"sector": "업종 미확인",
					"marketCap": "248850355040",
					"changePct": "-5.97"
				},
				{
					"symbol": "034830",
					"name": "한국토지신탁",
					"sector": "업종 미확인",
					"marketCap": "246429488480",
					"changePct": "-1.71"
				},
				{
					"symbol": "001230",
					"name": "동국홀딩스",
					"sector": "업종 미확인",
					"marketCap": "245857697415",
					"changePct": "-3.71"
				},
				{
					"symbol": "010580",
					"name": "에스엠벡셀",
					"sector": "업종 미확인",
					"marketCap": "244753872000",
					"changePct": "-8.52"
				},
				{
					"symbol": "002310",
					"name": "아세아제지",
					"sector": "업종 미확인",
					"marketCap": "244586962000",
					"changePct": "-4.02"
				},
				{
					"symbol": "286940",
					"name": "롯데이노베이트",
					"sector": "업종 미확인",
					"marketCap": "242372459340",
					"changePct": "-2.67"
				},
				{
					"symbol": "034120",
					"name": "SBS",
					"sector": "업종 미확인",
					"marketCap": "240609556860",
					"changePct": "-0.77"
				},
				{
					"symbol": "000430",
					"name": "대원강업",
					"sector": "업종 미확인",
					"marketCap": "237150000000",
					"changePct": "-2.42"
				},
				{
					"symbol": "044450",
					"name": "KSS해운",
					"sector": "업종 미확인",
					"marketCap": "235935136250",
					"changePct": "-1.04"
				},
				{
					"symbol": "097520",
					"name": "엠씨넥스",
					"sector": "업종 미확인",
					"marketCap": "235455000000",
					"changePct": "-4.68"
				},
				{
					"symbol": "317400",
					"name": "자이에스앤디",
					"sector": "업종 미확인",
					"marketCap": "234634246000",
					"changePct": "-11.55"
				},
				{
					"symbol": "348950",
					"name": "제이알글로벌리츠",
					"sector": "업종 미확인",
					"marketCap": "233298432000",
					"changePct": "0.00"
				},
				{
					"symbol": "003920",
					"name": "남양유업",
					"sector": "업종 미확인",
					"marketCap": "232611327000",
					"changePct": "-2.15"
				},
				{
					"symbol": "200880",
					"name": "서연이화",
					"sector": "업종 미확인",
					"marketCap": "231903989460",
					"changePct": "-4.13"
				},
				{
					"symbol": "003200",
					"name": "일신방직",
					"sector": "업종 미확인",
					"marketCap": "231896000000",
					"changePct": "-0.49"
				},
				{
					"symbol": "001790",
					"name": "대한제당",
					"sector": "업종 미확인",
					"marketCap": "230265913050",
					"changePct": "-2.38"
				},
				{
					"symbol": "004430",
					"name": "송원산업",
					"sector": "업종 미확인",
					"marketCap": "229680000000",
					"changePct": "-3.63"
				},
				{
					"symbol": "002020",
					"name": "코오롱",
					"sector": "업종 미확인",
					"marketCap": "229369473600",
					"changePct": "-3.53"
				},
				{
					"symbol": "001470",
					"name": "삼부토건",
					"sector": "업종 미확인",
					"marketCap": "227794235460",
					"changePct": "0.00"
				},
				{
					"symbol": "005950",
					"name": "이수화학",
					"sector": "업종 미확인",
					"marketCap": "222711611430",
					"changePct": "-3.64"
				},
				{
					"symbol": "0030R0",
					"name": "대신밸류리츠",
					"sector": "업종 미확인",
					"marketCap": "222082700000",
					"changePct": "-4.62"
				},
				{
					"symbol": "950210",
					"name": "프레스티지바이오파마",
					"sector": "업종 미확인",
					"marketCap": "221754811950",
					"changePct": "-4.77"
				},
				{
					"symbol": "404990",
					"name": "신한서부티엔디리츠",
					"sector": "업종 미확인",
					"marketCap": "221552156700",
					"changePct": "-1.24"
				},
				{
					"symbol": "044820",
					"name": "코스맥스비티아이",
					"sector": "업종 미확인",
					"marketCap": "221370379050",
					"changePct": "-0.22"
				},
				{
					"symbol": "002710",
					"name": "TCC스틸",
					"sector": "업종 미확인",
					"marketCap": "220981465710",
					"changePct": "-7.87"
				},
				{
					"symbol": "008730",
					"name": "율촌화학",
					"sector": "업종 미확인",
					"marketCap": "220472000000",
					"changePct": "-3.89"
				},
				{
					"symbol": "226320",
					"name": "잇츠한불",
					"sector": "업종 미확인",
					"marketCap": "218415977400",
					"changePct": "-4.05"
				},
				{
					"symbol": "077500",
					"name": "유니퀘스트",
					"sector": "업종 미확인",
					"marketCap": "217945029180",
					"changePct": "-7.85"
				},
				{
					"symbol": "000650",
					"name": "천일고속",
					"sector": "업종 미확인",
					"marketCap": "217670206000",
					"changePct": "-1.93"
				},
				{
					"symbol": "009680",
					"name": "모토닉",
					"sector": "업종 미확인",
					"marketCap": "216678947180",
					"changePct": "-0.30"
				},
				{
					"symbol": "013580",
					"name": "계룡건설",
					"sector": "업종 미확인",
					"marketCap": "215819157400",
					"changePct": "-6.74"
				},
				{
					"symbol": "001460",
					"name": "BYC",
					"sector": "업종 미확인",
					"marketCap": "215804482500",
					"changePct": "-1.85"
				},
				{
					"symbol": "025000",
					"name": "KPX케미칼",
					"sector": "업종 미확인",
					"marketCap": "214386199500",
					"changePct": "-0.96"
				},
				{
					"symbol": "028100",
					"name": "동아지질",
					"sector": "업종 미확인",
					"marketCap": "213220223000",
					"changePct": "-1.81"
				},
				{
					"symbol": "003120",
					"name": "일성아이에스",
					"sector": "업종 미확인",
					"marketCap": "212800000000",
					"changePct": "-1.72"
				},
				{
					"symbol": "004360",
					"name": "세방",
					"sector": "업종 미확인",
					"marketCap": "211992037270",
					"changePct": "-2.29"
				},
				{
					"symbol": "033920",
					"name": "무학",
					"sector": "업종 미확인",
					"marketCap": "210900000000",
					"changePct": "-0.94"
				},
				{
					"symbol": "005680",
					"name": "삼영전자",
					"sector": "업종 미확인",
					"marketCap": "210200000000",
					"changePct": "-4.45"
				},
				{
					"symbol": "058430",
					"name": "포스코스틸리온",
					"sector": "업종 미확인",
					"marketCap": "208500000000",
					"changePct": "-2.80"
				},
				{
					"symbol": "108670",
					"name": "LX하우시스",
					"sector": "업종 미확인",
					"marketCap": "208049944000",
					"changePct": "-4.53"
				},
				{
					"symbol": "001250",
					"name": "GS글로벌",
					"sector": "업종 미확인",
					"marketCap": "207572416460",
					"changePct": "-3.08"
				},
				{
					"symbol": "078520",
					"name": "에이블씨엔씨",
					"sector": "업종 미확인",
					"marketCap": "206197898760",
					"changePct": "-4.07"
				},
				{
					"symbol": "000050",
					"name": "경방",
					"sector": "업종 미확인",
					"marketCap": "206162830400",
					"changePct": "-2.84"
				},
				{
					"symbol": "037270",
					"name": "YG PLUS",
					"sector": "업종 미확인",
					"marketCap": "204040267550",
					"changePct": "-6.42"
				},
				{
					"symbol": "016580",
					"name": "환인제약",
					"sector": "업종 미확인",
					"marketCap": "203670766500",
					"changePct": "0.64"
				},
				{
					"symbol": "011930",
					"name": "신성이엔지",
					"sector": "업종 미확인",
					"marketCap": "202655696360",
					"changePct": "-7.93"
				},
				{
					"symbol": "003070",
					"name": "코오롱글로벌",
					"sector": "업종 미확인",
					"marketCap": "202628953230",
					"changePct": "-2.80"
				},
				{
					"symbol": "001390",
					"name": "KG케미칼",
					"sector": "업종 미확인",
					"marketCap": "202199071620",
					"changePct": "-3.64"
				},
				{
					"symbol": "334890",
					"name": "이지스밸류플러스리츠",
					"sector": "업종 미확인",
					"marketCap": "200012207040",
					"changePct": "-1.37"
				},
				{
					"symbol": "000320",
					"name": "노루홀딩스",
					"sector": "업종 미확인",
					"marketCap": "199234353490",
					"changePct": "5.56"
				},
				{
					"symbol": "003960",
					"name": "사조대림",
					"sector": "업종 미확인",
					"marketCap": "196577817150",
					"changePct": "-4.45"
				},
				{
					"symbol": "03473K",
					"name": "SK우",
					"sector": "업종 미확인",
					"marketCap": "194184305000",
					"changePct": "-7.55"
				},
				{
					"symbol": "339770",
					"name": "교촌에프앤비",
					"sector": "업종 미확인",
					"marketCap": "193364859600",
					"changePct": "-1.65"
				},
				{
					"symbol": "030210",
					"name": "다올투자증권",
					"sector": "업종 미확인",
					"marketCap": "191869983900",
					"changePct": "-5.26"
				},
				{
					"symbol": "217590",
					"name": "티엠씨",
					"sector": "업종 미확인",
					"marketCap": "189380608500",
					"changePct": "-9.24"
				},
				{
					"symbol": "900140",
					"name": "엘브이엠씨홀딩스",
					"sector": "업종 미확인",
					"marketCap": "189075500320",
					"changePct": "-2.00"
				},
				{
					"symbol": "010690",
					"name": "화신",
					"sector": "업종 미확인",
					"marketCap": "188919418100",
					"changePct": "-7.36"
				},
				{
					"symbol": "051905",
					"name": "LG생활건강우",
					"sector": "업종 미확인",
					"marketCap": "188453684100",
					"changePct": "-3.02"
				},
				{
					"symbol": "088260",
					"name": "이리츠코크렙",
					"sector": "업종 미확인",
					"marketCap": "187174398450",
					"changePct": "-1.17"
				},
				{
					"symbol": "136490",
					"name": "선진",
					"sector": "업종 미확인",
					"marketCap": "187145483480",
					"changePct": "-5.07"
				},
				{
					"symbol": "475560",
					"name": "더본코리아",
					"sector": "업종 미확인",
					"marketCap": "186684142300",
					"changePct": "-4.26"
				},
				{
					"symbol": "117580",
					"name": "대성에너지",
					"sector": "업종 미확인",
					"marketCap": "186175000000",
					"changePct": "-2.03"
				},
				{
					"symbol": "092790",
					"name": "넥스틸",
					"sector": "업종 미확인",
					"marketCap": "186174320000",
					"changePct": "-8.09"
				},
				{
					"symbol": "004310",
					"name": "현대약품",
					"sector": "업종 미확인",
					"marketCap": "185600000000",
					"changePct": "-5.38"
				},
				{
					"symbol": "010820",
					"name": "퍼스텍",
					"sector": "업종 미확인",
					"marketCap": "184601785330",
					"changePct": "-9.23"
				},
				{
					"symbol": "003610",
					"name": "방림",
					"sector": "업종 미확인",
					"marketCap": "184315865720",
					"changePct": "0.00"
				},
				{
					"symbol": "003650",
					"name": "미창석유",
					"sector": "업종 미확인",
					"marketCap": "183535396000",
					"changePct": "-3.48"
				},
				{
					"symbol": "035150",
					"name": "백산",
					"sector": "업종 미확인",
					"marketCap": "183277902330",
					"changePct": "-3.64"
				},
				{
					"symbol": "100250",
					"name": "진양홀딩스",
					"sector": "업종 미확인",
					"marketCap": "182434500000",
					"changePct": "-2.56"
				},
				{
					"symbol": "000540",
					"name": "흥국화재",
					"sector": "업종 미확인",
					"marketCap": "182127898575",
					"changePct": "-4.71"
				},
				{
					"symbol": "039570",
					"name": "HDC랩스",
					"sector": "업종 미확인",
					"marketCap": "181962783010",
					"changePct": "-1.13"
				},
				{
					"symbol": "432320",
					"name": "KB스타리츠",
					"sector": "업종 미확인",
					"marketCap": "181369434855",
					"changePct": "-0.50"
				},
				{
					"symbol": "000480",
					"name": "CR홀딩스",
					"sector": "업종 미확인",
					"marketCap": "180997291400",
					"changePct": "-1.15"
				},
				{
					"symbol": "001340",
					"name": "PKC",
					"sector": "업종 미확인",
					"marketCap": "180562636890",
					"changePct": "-2.91"
				},
				{
					"symbol": "035510",
					"name": "신세계 I&C",
					"sector": "업종 미확인",
					"marketCap": "180528255050",
					"changePct": "-3.06"
				},
				{
					"symbol": "000680",
					"name": "LS네트웍스",
					"sector": "업종 미확인",
					"marketCap": "180064891560",
					"changePct": "-5.38"
				},
				{
					"symbol": "095570",
					"name": "AJ네트웍스",
					"sector": "업종 미확인",
					"marketCap": "179427189435",
					"changePct": "-1.98"
				},
				{
					"symbol": "001080",
					"name": "MH머트리얼즈",
					"sector": "업종 미확인",
					"marketCap": "178032847200",
					"changePct": "0.60"
				},
				{
					"symbol": "053210",
					"name": "스카이라이프",
					"sector": "업종 미확인",
					"marketCap": "177735851700",
					"changePct": "0.00"
				},
				{
					"symbol": "003555",
					"name": "LG우",
					"sector": "업종 미확인",
					"marketCap": "177660741000",
					"changePct": "-2.32"
				},
				{
					"symbol": "007160",
					"name": "사조산업",
					"sector": "업종 미확인",
					"marketCap": "177250000000",
					"changePct": "-3.67"
				},
				{
					"symbol": "001630",
					"name": "종근당홀딩스",
					"sector": "업종 미확인",
					"marketCap": "176848093300",
					"changePct": "-2.62"
				},
				{
					"symbol": "000140",
					"name": "하이트진로홀딩스",
					"sector": "업종 미확인",
					"marketCap": "174050737500",
					"changePct": "-1.57"
				},
				{
					"symbol": "000300",
					"name": "DH오토넥스",
					"sector": "업종 미확인",
					"marketCap": "174035631000",
					"changePct": "0.00"
				},
				{
					"symbol": "102460",
					"name": "이연제약",
					"sector": "업종 미확인",
					"marketCap": "172485606080",
					"changePct": "-0.64"
				},
				{
					"symbol": "003220",
					"name": "대원제약",
					"sector": "업종 미확인",
					"marketCap": "172468113270",
					"changePct": "-2.90"
				},
				{
					"symbol": "008490",
					"name": "서흥",
					"sector": "업종 미확인",
					"marketCap": "171222872400",
					"changePct": "-3.08"
				},
				{
					"symbol": "053690",
					"name": "한미글로벌",
					"sector": "업종 미확인",
					"marketCap": "169622874000",
					"changePct": "-3.49"
				},
				{
					"symbol": "002100",
					"name": "경농",
					"sector": "업종 미확인",
					"marketCap": "169065499500",
					"changePct": "-1.14"
				},
				{
					"symbol": "001130",
					"name": "대한제분",
					"sector": "업종 미확인",
					"marketCap": "168662000000",
					"changePct": "-1.77"
				},
				{
					"symbol": "000700",
					"name": "유수홀딩스",
					"sector": "업종 미확인",
					"marketCap": "167969687400",
					"changePct": "1.10"
				},
				{
					"symbol": "487570",
					"name": "HS효성",
					"sector": "업종 미확인",
					"marketCap": "167480418650",
					"changePct": "-2.28"
				},
				{
					"symbol": "234080",
					"name": "JW생명과학",
					"sector": "업종 미확인",
					"marketCap": "165471089300",
					"changePct": "-1.97"
				},
				{
					"symbol": "004980",
					"name": "성신양회",
					"sector": "업종 미확인",
					"marketCap": "164748010560",
					"changePct": "-3.03"
				},
				{
					"symbol": "002150",
					"name": "도화엔지니어링",
					"sector": "업종 미확인",
					"marketCap": "163710600000",
					"changePct": "-5.18"
				},
				{
					"symbol": "009470",
					"name": "삼화전기",
					"sector": "업종 미확인",
					"marketCap": "163361354000",
					"changePct": "-9.69"
				},
				{
					"symbol": "000490",
					"name": "대동",
					"sector": "업종 미확인",
					"marketCap": "163160055900",
					"changePct": "-7.67"
				},
				{
					"symbol": "011500",
					"name": "한농화성",
					"sector": "업종 미확인",
					"marketCap": "162625236800",
					"changePct": "-7.39"
				},
				{
					"symbol": "016450",
					"name": "한세예스24홀딩스",
					"sector": "업종 미확인",
					"marketCap": "162600000000",
					"changePct": "-2.40"
				},
				{
					"symbol": "000860",
					"name": "강남제비스코",
					"sector": "업종 미확인",
					"marketCap": "162500000000",
					"changePct": "-2.19"
				},
				{
					"symbol": "102260",
					"name": "동성케미컬",
					"sector": "업종 미확인",
					"marketCap": "161382647335",
					"changePct": "-5.21"
				},
				{
					"symbol": "105840",
					"name": "우진",
					"sector": "업종 미확인",
					"marketCap": "159928932240",
					"changePct": "-7.26"
				},
				{
					"symbol": "003547",
					"name": "대신증권2우B",
					"sector": "업종 미확인",
					"marketCap": "158934883110",
					"changePct": "-0.24"
				},
				{
					"symbol": "003460",
					"name": "유화증권",
					"sector": "업종 미확인",
					"marketCap": "158199737850",
					"changePct": "-1.06"
				},
				{
					"symbol": "267850",
					"name": "아시아나IDT",
					"sector": "업종 미확인",
					"marketCap": "154512000000",
					"changePct": "7.24"
				},
				{
					"symbol": "128820",
					"name": "대성산업",
					"sector": "업종 미확인",
					"marketCap": "153348270420",
					"changePct": "-5.04"
				},
				{
					"symbol": "090350",
					"name": "노루페인트",
					"sector": "업종 미확인",
					"marketCap": "152800000000",
					"changePct": "-2.30"
				},
				{
					"symbol": "377190",
					"name": "디앤디플랫폼리츠",
					"sector": "업종 미확인",
					"marketCap": "152048000000",
					"changePct": "-2.55"
				},
				{
					"symbol": "000390",
					"name": "SP삼화",
					"sector": "업종 미확인",
					"marketCap": "151795357020",
					"changePct": "-5.74"
				},
				{
					"symbol": "033530",
					"name": "SJG세종",
					"sector": "업종 미확인",
					"marketCap": "151763397390",
					"changePct": "-3.11"
				},
				{
					"symbol": "00279K",
					"name": "아모레퍼시픽홀딩스3우C",
					"sector": "업종 미확인",
					"marketCap": "151063860000",
					"changePct": "-0.47"
				},
				{
					"symbol": "092200",
					"name": "디아이씨",
					"sector": "업종 미확인",
					"marketCap": "150693204875",
					"changePct": "-4.67"
				},
				{
					"symbol": "004560",
					"name": "현대비앤지스틸",
					"sector": "업종 미확인",
					"marketCap": "148375500240",
					"changePct": "-1.60"
				},
				{
					"symbol": "005960",
					"name": "동부건설",
					"sector": "업종 미확인",
					"marketCap": "146858643200",
					"changePct": "-4.05"
				},
				{
					"symbol": "000157",
					"name": "두산2우B",
					"sector": "업종 미확인",
					"marketCap": "146638036000",
					"changePct": "-9.26"
				},
				{
					"symbol": "004380",
					"name": "삼익THK",
					"sector": "업종 미확인",
					"marketCap": "146556000000",
					"changePct": "-0.84"
				},
				{
					"symbol": "293480",
					"name": "하나제약",
					"sector": "업종 미확인",
					"marketCap": "145915886660",
					"changePct": "-1.08"
				},
				{
					"symbol": "002170",
					"name": "SYTS",
					"sector": "업종 미확인",
					"marketCap": "145200000000",
					"changePct": "-0.62"
				},
				{
					"symbol": "272550",
					"name": "삼양패키징",
					"sector": "업종 미확인",
					"marketCap": "145108749780",
					"changePct": "-0.93"
				},
				{
					"symbol": "000520",
					"name": "삼일제약",
					"sector": "업종 미확인",
					"marketCap": "144250543150",
					"changePct": "-3.20"
				},
				{
					"symbol": "015230",
					"name": "대창단조",
					"sector": "업종 미확인",
					"marketCap": "142775441200",
					"changePct": "-5.23"
				},
				{
					"symbol": "007860",
					"name": "서연",
					"sector": "업종 미확인",
					"marketCap": "142757451520",
					"changePct": "-5.00"
				},
				{
					"symbol": "213500",
					"name": "한솔제지",
					"sector": "업종 미확인",
					"marketCap": "142565450240",
					"changePct": "-2.60"
				},
				{
					"symbol": "000970",
					"name": "한국주철관",
					"sector": "업종 미확인",
					"marketCap": "142503125000",
					"changePct": "-2.50"
				},
				{
					"symbol": "005010",
					"name": "휴스틸",
					"sector": "업종 미확인",
					"marketCap": "140470187500",
					"changePct": "-5.84"
				},
				{
					"symbol": "024090",
					"name": "디씨엠",
					"sector": "업종 미확인",
					"marketCap": "140106000000",
					"changePct": "-0.73"
				},
				{
					"symbol": "017860",
					"name": "DS단석",
					"sector": "업종 미확인",
					"marketCap": "139993317620",
					"changePct": "-5.60"
				},
				{
					"symbol": "014710",
					"name": "사조씨푸드",
					"sector": "업종 미확인",
					"marketCap": "139470198300",
					"changePct": "-4.26"
				},
				{
					"symbol": "003520",
					"name": "영진약품",
					"sector": "업종 미확인",
					"marketCap": "139364261022",
					"changePct": "0.13"
				},
				{
					"symbol": "004970",
					"name": "신라교역",
					"sector": "업종 미확인",
					"marketCap": "139360000000",
					"changePct": "-2.35"
				},
				{
					"symbol": "003830",
					"name": "대한화섬",
					"sector": "업종 미확인",
					"marketCap": "138510400000",
					"changePct": "-0.10"
				},
				{
					"symbol": "013890",
					"name": "지누스",
					"sector": "업종 미확인",
					"marketCap": "138351880030",
					"changePct": "-3.52"
				},
				{
					"symbol": "002420",
					"name": "우양피앤엘",
					"sector": "업종 미확인",
					"marketCap": "137762047280",
					"changePct": "-4.02"
				},
				{
					"symbol": "008350",
					"name": "남선알미늄",
					"sector": "업종 미확인",
					"marketCap": "137469230850",
					"changePct": "0.19"
				},
				{
					"symbol": "097955",
					"name": "CJ제일제당 우",
					"sector": "업종 미확인",
					"marketCap": "135796395900",
					"changePct": "-0.97"
				},
				{
					"symbol": "000020",
					"name": "동화약품",
					"sector": "업종 미확인",
					"marketCap": "134210713350",
					"changePct": "-3.22"
				},
				{
					"symbol": "400760",
					"name": "NH올원리츠",
					"sector": "업종 미확인",
					"marketCap": "134027431000",
					"changePct": "-0.41"
				},
				{
					"symbol": "107590",
					"name": "미원홀딩스",
					"sector": "업종 미확인",
					"marketCap": "131776000000",
					"changePct": "0.89"
				},
				{
					"symbol": "004080",
					"name": "신흥",
					"sector": "업종 미확인",
					"marketCap": "131376000000",
					"changePct": "-0.83"
				},
				{
					"symbol": "094280",
					"name": "효성ITX",
					"sector": "업종 미확인",
					"marketCap": "131301152000",
					"changePct": "-1.13"
				},
				{
					"symbol": "015890",
					"name": "태경산업",
					"sector": "업종 미확인",
					"marketCap": "130360225000",
					"changePct": "-1.87"
				},
				{
					"symbol": "025560",
					"name": "미래산업",
					"sector": "업종 미확인",
					"marketCap": "130143106430",
					"changePct": "-8.14"
				},
				{
					"symbol": "001045",
					"name": "CJ우",
					"sector": "업종 미확인",
					"marketCap": "129058733300",
					"changePct": "-2.39"
				},
				{
					"symbol": "005800",
					"name": "신영와코루",
					"sector": "업종 미확인",
					"marketCap": "128520000000",
					"changePct": "3.40"
				},
				{
					"symbol": "003480",
					"name": "한진중공업홀딩스",
					"sector": "업종 미확인",
					"marketCap": "128454682200",
					"changePct": "-0.91"
				},
				{
					"symbol": "101530",
					"name": "해태제과식품",
					"sector": "업종 미확인",
					"marketCap": "128405185020",
					"changePct": "-2.00"
				},
				{
					"symbol": "460850",
					"name": "동국씨엠",
					"sector": "업종 미확인",
					"marketCap": "128115740960",
					"changePct": "-2.83"
				},
				{
					"symbol": "267290",
					"name": "경동도시가스",
					"sector": "업종 미확인",
					"marketCap": "127340769600",
					"changePct": "-0.46"
				},
				{
					"symbol": "078000",
					"name": "텔코웨어",
					"sector": "업종 미확인",
					"marketCap": "123539829490",
					"changePct": "-0.45"
				},
				{
					"symbol": "462520",
					"name": "조선내화",
					"sector": "업종 미확인",
					"marketCap": "123530850560",
					"changePct": "-0.86"
				},
				{
					"symbol": "071840",
					"name": "롯데하이마트",
					"sector": "업종 미확인",
					"marketCap": "122287948160",
					"changePct": "-1.71"
				},
				{
					"symbol": "018470",
					"name": "조일알미늄",
					"sector": "업종 미확인",
					"marketCap": "121946346360",
					"changePct": "-1.23"
				},
				{
					"symbol": "007570",
					"name": "일양약품",
					"sector": "업종 미확인",
					"marketCap": "121003109760",
					"changePct": "0.32"
				},
				{
					"symbol": "004090",
					"name": "한국석유",
					"sector": "업종 미확인",
					"marketCap": "120467198800",
					"changePct": "-3.26"
				},
				{
					"symbol": "020120",
					"name": "키다리스튜디오",
					"sector": "업종 미확인",
					"marketCap": "120296258170",
					"changePct": "-1.22"
				},
				{
					"symbol": "016740",
					"name": "두올",
					"sector": "업종 미확인",
					"marketCap": "120287530680",
					"changePct": "0.24"
				},
				{
					"symbol": "214390",
					"name": "경보제약",
					"sector": "업종 미확인",
					"marketCap": "119175697100",
					"changePct": "0.00"
				},
				{
					"symbol": "001780",
					"name": "알루코",
					"sector": "업종 미확인",
					"marketCap": "118907402096",
					"changePct": "-4.36"
				},
				{
					"symbol": "004150",
					"name": "한솔홀딩스",
					"sector": "업종 미확인",
					"marketCap": "118772064900",
					"changePct": "-3.02"
				},
				{
					"symbol": "271980",
					"name": "제일약품",
					"sector": "업종 미확인",
					"marketCap": "117344878560",
					"changePct": "-5.45"
				},
				{
					"symbol": "002390",
					"name": "한독",
					"sector": "업종 미확인",
					"marketCap": "115888947860",
					"changePct": "0.84"
				},
				{
					"symbol": "004960",
					"name": "한신공영",
					"sector": "업종 미확인",
					"marketCap": "115584260040",
					"changePct": "-2.73"
				},
				{
					"symbol": "012610",
					"name": "경인양행",
					"sector": "업종 미확인",
					"marketCap": "114445003750",
					"changePct": "-3.85"
				},
				{
					"symbol": "210980",
					"name": "SK디앤디",
					"sector": "업종 미확인",
					"marketCap": "113744717985",
					"changePct": "-2.55"
				},
				{
					"symbol": "011785",
					"name": "금호석유화학우",
					"sector": "업종 미확인",
					"marketCap": "113531899300",
					"changePct": "-1.96"
				},
				{
					"symbol": "001360",
					"name": "삼성제약",
					"sector": "업종 미확인",
					"marketCap": "113276981037",
					"changePct": "-5.28"
				},
				{
					"symbol": "214420",
					"name": "토니모리",
					"sector": "업종 미확인",
					"marketCap": "112576459320",
					"changePct": "1.74"
				},
				{
					"symbol": "081000",
					"name": "일진다이아",
					"sector": "업종 미확인",
					"marketCap": "112203502500",
					"changePct": "-3.42"
				},
				{
					"symbol": "014280",
					"name": "금강공업",
					"sector": "업종 미확인",
					"marketCap": "112038143740",
					"changePct": "-5.45"
				},
				{
					"symbol": "227840",
					"name": "현대코퍼레이션홀딩스",
					"sector": "업종 미확인",
					"marketCap": "111576249360",
					"changePct": "-0.49"
				},
				{
					"symbol": "034590",
					"name": "인천도시가스",
					"sector": "업종 미확인",
					"marketCap": "111118751600",
					"changePct": "-1.74"
				},
				{
					"symbol": "003720",
					"name": "삼영",
					"sector": "업종 미확인",
					"marketCap": "110840000000",
					"changePct": "-10.44"
				},
				{
					"symbol": "009270",
					"name": "신원",
					"sector": "업종 미확인",
					"marketCap": "110064806887",
					"changePct": "-5.24"
				},
				{
					"symbol": "004100",
					"name": "태양금속",
					"sector": "업종 미확인",
					"marketCap": "109733000000",
					"changePct": "-3.08"
				},
				{
					"symbol": "298000",
					"name": "효성화학",
					"sector": "업종 미확인",
					"marketCap": "109014566250",
					"changePct": "-5.74"
				},
				{
					"symbol": "015590",
					"name": "DKME",
					"sector": "업종 미확인",
					"marketCap": "108661486780",
					"changePct": "-1.21"
				},
				{
					"symbol": "350520",
					"name": "이지스레지던스리츠",
					"sector": "업종 미확인",
					"marketCap": "107833640850",
					"changePct": "-2.01"
				},
				{
					"symbol": "002460",
					"name": "HS화성",
					"sector": "업종 미확인",
					"marketCap": "107590000000",
					"changePct": "0.57"
				},
				{
					"symbol": "006840",
					"name": "AK홀딩스",
					"sector": "업종 미확인",
					"marketCap": "107172768490",
					"changePct": "2.15"
				},
				{
					"symbol": "016710",
					"name": "대성홀딩스",
					"sector": "업종 미확인",
					"marketCap": "106834007760",
					"changePct": "-1.48"
				},
				{
					"symbol": "016880",
					"name": "웅진",
					"sector": "업종 미확인",
					"marketCap": "106782578880",
					"changePct": "-6.51"
				},
				{
					"symbol": "089470",
					"name": "HDC현대EP",
					"sector": "업종 미확인",
					"marketCap": "106546000000",
					"changePct": "-0.89"
				},
				{
					"symbol": "241590",
					"name": "화승엔터프라이즈",
					"sector": "업종 미확인",
					"marketCap": "106394768656",
					"changePct": "-12.20"
				},
				{
					"symbol": "002620",
					"name": "제일파마홀딩스",
					"sector": "업종 미확인",
					"marketCap": "106222810750",
					"changePct": "-2.35"
				},
				{
					"symbol": "014530",
					"name": "극동유화",
					"sector": "업종 미확인",
					"marketCap": "105654342600",
					"changePct": "-2.88"
				},
				{
					"symbol": "001520",
					"name": "동양",
					"sector": "업종 미확인",
					"marketCap": "104443981200",
					"changePct": "-2.11"
				},
				{
					"symbol": "008970",
					"name": "KBI동양철관",
					"sector": "업종 미확인",
					"marketCap": "104181974628",
					"changePct": "-3.37"
				},
				{
					"symbol": "210540",
					"name": "디와이파워",
					"sector": "업종 미확인",
					"marketCap": "103681638120",
					"changePct": "-2.19"
				},
				{
					"symbol": "037560",
					"name": "LG헬로비전",
					"sector": "업종 미확인",
					"marketCap": "103159224180",
					"changePct": "-1.26"
				},
				{
					"symbol": "013570",
					"name": "디와이",
					"sector": "업종 미확인",
					"marketCap": "102514970535",
					"changePct": "-1.39"
				},
				{
					"symbol": "023450",
					"name": "동남합성",
					"sector": "업종 미확인",
					"marketCap": "101850000000",
					"changePct": "0.00"
				},
				{
					"symbol": "008700",
					"name": "아남전자",
					"sector": "업종 미확인",
					"marketCap": "101804762400",
					"changePct": "-3.79"
				},
				{
					"symbol": "123690",
					"name": "한국화장품",
					"sector": "업종 미확인",
					"marketCap": "101067720000",
					"changePct": "-2.63"
				},
				{
					"symbol": "006805",
					"name": "미래에셋증권우",
					"sector": "업종 미확인",
					"marketCap": "101040538830",
					"changePct": "-6.48"
				},
				{
					"symbol": "025820",
					"name": "이구산업",
					"sector": "업종 미확인",
					"marketCap": "100827630000",
					"changePct": "-6.66"
				},
				{
					"symbol": "119650",
					"name": "KC코트렐",
					"sector": "업종 미확인",
					"marketCap": "100782913662",
					"changePct": "0.00"
				},
				{
					"symbol": "009070",
					"name": "KCTC",
					"sector": "업종 미확인",
					"marketCap": "100050000000",
					"changePct": "-5.39"
				},
				{
					"symbol": "035000",
					"name": "HS애드",
					"sector": "업종 미확인",
					"marketCap": "100001163480",
					"changePct": "-0.80"
				},
				{
					"symbol": "248170",
					"name": "샘표식품",
					"sector": "업종 미확인",
					"marketCap": "99551792800",
					"changePct": "-2.68"
				},
				{
					"symbol": "079430",
					"name": "현대리바트",
					"sector": "업종 미확인",
					"marketCap": "98961873840",
					"changePct": "-1.50"
				},
				{
					"symbol": "083420",
					"name": "그린케미칼",
					"sector": "업종 미확인",
					"marketCap": "98880000000",
					"changePct": "-5.94"
				},
				{
					"symbol": "012320",
					"name": "경동인베스트",
					"sector": "업종 미확인",
					"marketCap": "96729440700",
					"changePct": "-3.20"
				},
				{
					"symbol": "006060",
					"name": "화승인더",
					"sector": "업종 미확인",
					"marketCap": "96533400000",
					"changePct": "-5.78"
				},
				{
					"symbol": "051630",
					"name": "진양화학",
					"sector": "업종 미확인",
					"marketCap": "96460000000",
					"changePct": "-2.05"
				},
				{
					"symbol": "002210",
					"name": "동성제약",
					"sector": "업종 미확인",
					"marketCap": "95846550944",
					"changePct": "-3.41"
				},
				{
					"symbol": "008040",
					"name": "사조동아원",
					"sector": "업종 미확인",
					"marketCap": "95696038800",
					"changePct": "-4.24"
				},
				{
					"symbol": "021820",
					"name": "세원정공",
					"sector": "업종 미확인",
					"marketCap": "95200000000",
					"changePct": "-2.46"
				},
				{
					"symbol": "017550",
					"name": "수산세보틱스",
					"sector": "업종 미확인",
					"marketCap": "94971475860",
					"changePct": "-6.17"
				},
				{
					"symbol": "013520",
					"name": "화승코퍼레이션",
					"sector": "업종 미확인",
					"marketCap": "93996251256",
					"changePct": "-9.28"
				},
				{
					"symbol": "058850",
					"name": "KTcs",
					"sector": "업종 미확인",
					"marketCap": "93781079250",
					"changePct": "-2.58"
				},
				{
					"symbol": "009580",
					"name": "무림P&P",
					"sector": "업종 미확인",
					"marketCap": "93552486000",
					"changePct": "-3.85"
				},
				{
					"symbol": "004250",
					"name": "NPC",
					"sector": "업종 미확인",
					"marketCap": "92350800000",
					"changePct": "-2.52"
				},
				{
					"symbol": "014440",
					"name": "영보화학",
					"sector": "업종 미확인",
					"marketCap": "92000000000",
					"changePct": "-0.11"
				},
				{
					"symbol": "014580",
					"name": "태경비케이",
					"sector": "업종 미확인",
					"marketCap": "90610483500",
					"changePct": "-3.95"
				},
				{
					"symbol": "002450",
					"name": "삼익악기",
					"sector": "업종 미확인",
					"marketCap": "90259322255",
					"changePct": "5.39"
				},
				{
					"symbol": "007540",
					"name": "샘표",
					"sector": "업종 미확인",
					"marketCap": "90192193000",
					"changePct": "-0.78"
				},
				{
					"symbol": "010100",
					"name": "한국무브넥스",
					"sector": "업종 미확인",
					"marketCap": "89828739000",
					"changePct": "-1.99"
				},
				{
					"symbol": "032560",
					"name": "황금에스티",
					"sector": "업종 미확인",
					"marketCap": "89590000000",
					"changePct": "-2.59"
				},
				{
					"symbol": "011690",
					"name": "와이투솔루션",
					"sector": "업종 미확인",
					"marketCap": "89361485470",
					"changePct": "-6.17"
				},
				{
					"symbol": "014790",
					"name": "HL D&I",
					"sector": "업종 미확인",
					"marketCap": "88210540330",
					"changePct": "-3.72"
				},
				{
					"symbol": "001275",
					"name": "부국증권우",
					"sector": "업종 미확인",
					"marketCap": "88200000000",
					"changePct": "-0.84"
				},
				{
					"symbol": "003780",
					"name": "진양산업",
					"sector": "업종 미확인",
					"marketCap": "87750000000",
					"changePct": "-11.07"
				},
				{
					"symbol": "025620",
					"name": "차AI헬스케어",
					"sector": "업종 미확인",
					"marketCap": "87652129995",
					"changePct": "-0.10"
				},
				{
					"symbol": "078935",
					"name": "GS우",
					"sector": "업종 미확인",
					"marketCap": "87560059200",
					"changePct": "-1.60"
				},
				{
					"symbol": "120030",
					"name": "조선선재",
					"sector": "업종 미확인",
					"marketCap": "87406744500",
					"changePct": "-2.11"
				},
				{
					"symbol": "008260",
					"name": "NI스틸",
					"sector": "업종 미확인",
					"marketCap": "87230356850",
					"changePct": "-2.09"
				},
				{
					"symbol": "092220",
					"name": "KEC",
					"sector": "업종 미확인",
					"marketCap": "86729676480",
					"changePct": "-4.42"
				},
				{
					"symbol": "012200",
					"name": "계양전기",
					"sector": "업종 미확인",
					"marketCap": "86077474470",
					"changePct": "-10.83"
				},
				{
					"symbol": "002200",
					"name": "한국수출포장",
					"sector": "업종 미확인",
					"marketCap": "85592349255",
					"changePct": "0.00"
				},
				{
					"symbol": "067830",
					"name": "세이브존I&C",
					"sector": "업종 미확인",
					"marketCap": "84954652650",
					"changePct": "-3.27"
				},
				{
					"symbol": "002600",
					"name": "조흥",
					"sector": "업종 미확인",
					"marketCap": "84720000000",
					"changePct": "-0.28"
				},
				{
					"symbol": "264900",
					"name": "크라운제과",
					"sector": "업종 미확인",
					"marketCap": "84661226000",
					"changePct": "-0.15"
				},
				{
					"symbol": "070960",
					"name": "모나용평",
					"sector": "업종 미확인",
					"marketCap": "84281466083",
					"changePct": "-7.94"
				},
				{
					"symbol": "000590",
					"name": "CS홀딩스",
					"sector": "업종 미확인",
					"marketCap": "83469048600",
					"changePct": "-2.17"
				},
				{
					"symbol": "001210",
					"name": "금호전기",
					"sector": "업종 미확인",
					"marketCap": "81191643940",
					"changePct": "-6.45"
				},
				{
					"symbol": "363280",
					"name": "티와이홀딩스",
					"sector": "업종 미확인",
					"marketCap": "81076247406",
					"changePct": "-3.10"
				},
				{
					"symbol": "023000",
					"name": "삼원강재",
					"sector": "업종 미확인",
					"marketCap": "81069510240",
					"changePct": "0.49"
				},
				{
					"symbol": "004890",
					"name": "동일산업",
					"sector": "업종 미확인",
					"marketCap": "80759659500",
					"changePct": "-2.35"
				},
				{
					"symbol": "058860",
					"name": "KTis",
					"sector": "업종 미확인",
					"marketCap": "80553701880",
					"changePct": "-1.72"
				},
				{
					"symbol": "013700",
					"name": "까뮤이앤씨",
					"sector": "업종 미확인",
					"marketCap": "79349102240",
					"changePct": "-2.28"
				},
				{
					"symbol": "036580",
					"name": "팜스코",
					"sector": "업종 미확인",
					"marketCap": "78965077450",
					"changePct": "-1.60"
				},
				{
					"symbol": "001290",
					"name": "상상인증권",
					"sector": "업종 미확인",
					"marketCap": "78761086240",
					"changePct": "-4.22"
				},
				{
					"symbol": "000180",
					"name": "성창기업지주",
					"sector": "업종 미확인",
					"marketCap": "78679804800",
					"changePct": "-5.84"
				},
				{
					"symbol": "006660",
					"name": "삼성공조",
					"sector": "업종 미확인",
					"marketCap": "77850088120",
					"changePct": "-3.62"
				},
				{
					"symbol": "010660",
					"name": "화천기계",
					"sector": "업종 미확인",
					"marketCap": "76780000000",
					"changePct": "-3.86"
				},
				{
					"symbol": "000105",
					"name": "유한양행우",
					"sector": "업종 미확인",
					"marketCap": "76709112000",
					"changePct": "-2.62"
				},
				{
					"symbol": "139990",
					"name": "아주스틸",
					"sector": "업종 미확인",
					"marketCap": "76115633096",
					"changePct": "-2.29"
				},
				{
					"symbol": "009180",
					"name": "한솔로지스틱스",
					"sector": "업종 미확인",
					"marketCap": "75457611000",
					"changePct": "-0.19"
				},
				{
					"symbol": "37550L",
					"name": "DL이앤씨2우(전환)",
					"sector": "업종 미확인",
					"marketCap": "74763065400",
					"changePct": "-1.67"
				},
				{
					"symbol": "003010",
					"name": "혜인",
					"sector": "업종 미확인",
					"marketCap": "74496697420",
					"changePct": "-12.14"
				},
				{
					"symbol": "011280",
					"name": "태림포장",
					"sector": "업종 미확인",
					"marketCap": "73496565720",
					"changePct": "-2.81"
				},
				{
					"symbol": "006090",
					"name": "사조오양",
					"sector": "업종 미확인",
					"marketCap": "73308886080",
					"changePct": "0.26"
				},
				{
					"symbol": "023800",
					"name": "인지컨트롤스",
					"sector": "업종 미확인",
					"marketCap": "73275628095",
					"changePct": "-2.32"
				},
				{
					"symbol": "007590",
					"name": "동방아그로",
					"sector": "업종 미확인",
					"marketCap": "73262564260",
					"changePct": "1.13"
				},
				{
					"symbol": "012800",
					"name": "대창",
					"sector": "업종 미확인",
					"marketCap": "73003539699",
					"changePct": "-5.09"
				},
				{
					"symbol": "007210",
					"name": "벽산",
					"sector": "업종 미확인",
					"marketCap": "72680320000",
					"changePct": "-4.96"
				},
				{
					"symbol": "084670",
					"name": "동양고속",
					"sector": "업종 미확인",
					"marketCap": "72678781900",
					"changePct": "-3.09"
				},
				{
					"symbol": "002780",
					"name": "진흥기업",
					"sector": "업종 미확인",
					"marketCap": "71992261250",
					"changePct": "-5.39"
				},
				{
					"symbol": "010960",
					"name": "삼호개발",
					"sector": "업종 미확인",
					"marketCap": "71877600000",
					"changePct": "-2.13"
				},
				{
					"symbol": "019180",
					"name": "티에이치엔",
					"sector": "업종 미확인",
					"marketCap": "71370000000",
					"changePct": "-5.14"
				},
				{
					"symbol": "004840",
					"name": "DRB동일",
					"sector": "업종 미확인",
					"marketCap": "71307746800",
					"changePct": "-5.13"
				},
				{
					"symbol": "055490",
					"name": "테이팩스",
					"sector": "업종 미확인",
					"marketCap": "71177485500",
					"changePct": "-1.85"
				},
				{
					"symbol": "013360",
					"name": "일성건설",
					"sector": "업종 미확인",
					"marketCap": "70556493280",
					"changePct": "-5.91"
				},
				{
					"symbol": "002795",
					"name": "아모레퍼시픽홀딩스우",
					"sector": "업종 미확인",
					"marketCap": "70384327160",
					"changePct": "-1.43"
				},
				{
					"symbol": "338100",
					"name": "NH프라임리츠",
					"sector": "업종 미확인",
					"marketCap": "70161600000",
					"changePct": "-0.66"
				},
				{
					"symbol": "005740",
					"name": "크라운해태홀딩스",
					"sector": "업종 미확인",
					"marketCap": "69559820695",
					"changePct": "-2.90"
				},
				{
					"symbol": "001260",
					"name": "남광토건",
					"sector": "업종 미확인",
					"marketCap": "69319632600",
					"changePct": "-6.00"
				},
				{
					"symbol": "002220",
					"name": "한일철강",
					"sector": "업종 미확인",
					"marketCap": "69279908700",
					"changePct": "-3.53"
				},
				{
					"symbol": "007980",
					"name": "TP",
					"sector": "업종 미확인",
					"marketCap": "69032899200",
					"changePct": "-2.39"
				},
				{
					"symbol": "163560",
					"name": "동일고무벨트",
					"sector": "업종 미확인",
					"marketCap": "68110000000",
					"changePct": "-2.78"
				},
				{
					"symbol": "005750",
					"name": "대림바스",
					"sector": "업종 미확인",
					"marketCap": "67198572000",
					"changePct": "-1.22"
				},
				{
					"symbol": "016090",
					"name": "대현",
					"sector": "업종 미확인",
					"marketCap": "67087699650",
					"changePct": "1.00"
				},
				{
					"symbol": "004720",
					"name": "팜젠사이언스",
					"sector": "업종 미확인",
					"marketCap": "66943648575",
					"changePct": "-0.34"
				},
				{
					"symbol": "069730",
					"name": "DSR제강",
					"sector": "업종 미확인",
					"marketCap": "66744000000",
					"changePct": "-1.38"
				},
				{
					"symbol": "096775",
					"name": "SK이노베이션우",
					"sector": "업종 미확인",
					"marketCap": "66166578000",
					"changePct": "-3.46"
				},
				{
					"symbol": "004140",
					"name": "동방",
					"sector": "업종 미확인",
					"marketCap": "65145658228",
					"changePct": "-5.17"
				},
				{
					"symbol": "013870",
					"name": "지엠비코리아",
					"sector": "업종 미확인",
					"marketCap": "65131836200",
					"changePct": "-1.59"
				},
				{
					"symbol": "000850",
					"name": "화천기공",
					"sector": "업종 미확인",
					"marketCap": "65010000000",
					"changePct": "-1.83"
				},
				{
					"symbol": "003580",
					"name": "HLB글로벌",
					"sector": "업종 미확인",
					"marketCap": "64595968875",
					"changePct": "-3.34"
				},
				{
					"symbol": "027970",
					"name": "한국제지",
					"sector": "업종 미확인",
					"marketCap": "64385033792",
					"changePct": "-3.09"
				},
				{
					"symbol": "111380",
					"name": "동인기연",
					"sector": "업종 미확인",
					"marketCap": "63976320000",
					"changePct": "-0.85"
				},
				{
					"symbol": "001560",
					"name": "제일연마",
					"sector": "업종 미확인",
					"marketCap": "63840000000",
					"changePct": "-0.24"
				},
				{
					"symbol": "100220",
					"name": "비상교육",
					"sector": "업종 미확인",
					"marketCap": "63749014605",
					"changePct": "-1.31"
				},
				{
					"symbol": "095720",
					"name": "웅진씽크빅",
					"sector": "업종 미확인",
					"marketCap": "63419026860",
					"changePct": "-1.24"
				},
				{
					"symbol": "085310",
					"name": "엔케이",
					"sector": "업종 미확인",
					"marketCap": "62534363820",
					"changePct": "-1.40"
				},
				{
					"symbol": "009770",
					"name": "삼정펄프",
					"sector": "업종 미확인",
					"marketCap": "62374276450",
					"changePct": "-0.60"
				},
				{
					"symbol": "001020",
					"name": "페이퍼코리아",
					"sector": "업종 미확인",
					"marketCap": "62294158500",
					"changePct": "4.54"
				},
				{
					"symbol": "002700",
					"name": "신일전자",
					"sector": "업종 미확인",
					"marketCap": "61487126337",
					"changePct": "-2.07"
				},
				{
					"symbol": "109070",
					"name": "주성코퍼레이션",
					"sector": "업종 미확인",
					"marketCap": "61430487800",
					"changePct": "-1.61"
				},
				{
					"symbol": "010640",
					"name": "진양폴리",
					"sector": "업종 미확인",
					"marketCap": "61289000000",
					"changePct": "-10.38"
				},
				{
					"symbol": "002720",
					"name": "국제약품",
					"sector": "업종 미확인",
					"marketCap": "61046115320",
					"changePct": "-3.99"
				},
				{
					"symbol": "017370",
					"name": "우신시스템",
					"sector": "업종 미확인",
					"marketCap": "60894229550",
					"changePct": "-0.75"
				},
				{
					"symbol": "018500",
					"name": "동원모빌리티",
					"sector": "업종 미확인",
					"marketCap": "60781412900",
					"changePct": "-2.62"
				},
				{
					"symbol": "155660",
					"name": "DSR",
					"sector": "업종 미확인",
					"marketCap": "60480000000",
					"changePct": "-2.83"
				},
				{
					"symbol": "024900",
					"name": "디와이덕양",
					"sector": "업종 미확인",
					"marketCap": "60408037900",
					"changePct": "0.00"
				},
				{
					"symbol": "002760",
					"name": "보락",
					"sector": "업종 미확인",
					"marketCap": "60199500000",
					"changePct": "-0.89"
				},
				{
					"symbol": "33626K",
					"name": "두산퓨얼셀1우",
					"sector": "업종 미확인",
					"marketCap": "59804795000",
					"changePct": "-1.43"
				},
				{
					"symbol": "031820",
					"name": "아이티센씨티에스",
					"sector": "업종 미확인",
					"marketCap": "59799421240",
					"changePct": "-4.82"
				},
				{
					"symbol": "079980",
					"name": "휴비스",
					"sector": "업종 미확인",
					"marketCap": "59512500000",
					"changePct": "-4.85"
				},
				{
					"symbol": "000230",
					"name": "일동홀딩스",
					"sector": "업종 미확인",
					"marketCap": "58856040000",
					"changePct": "-2.86"
				},
				{
					"symbol": "000220",
					"name": "유유제약",
					"sector": "업종 미확인",
					"marketCap": "58738033260",
					"changePct": "-0.27"
				},
				{
					"symbol": "010040",
					"name": "한국내화",
					"sector": "업종 미확인",
					"marketCap": "58643764536",
					"changePct": "-0.28"
				},
				{
					"symbol": "011150",
					"name": "CJ씨푸드",
					"sector": "업종 미확인",
					"marketCap": "58603090763",
					"changePct": "-2.39"
				},
				{
					"symbol": "019680",
					"name": "대교",
					"sector": "업종 미확인",
					"marketCap": "58540251750",
					"changePct": "-0.89"
				},
				{
					"symbol": "063160",
					"name": "종근당바이오",
					"sector": "업종 미확인",
					"marketCap": "58315776060",
					"changePct": "-1.94"
				},
				{
					"symbol": "006980",
					"name": "우성",
					"sector": "업종 미확인",
					"marketCap": "57906600000",
					"changePct": "4.46"
				},
				{
					"symbol": "120115",
					"name": "코오롱인더우",
					"sector": "업종 미확인",
					"marketCap": "57433095000",
					"changePct": "-3.04"
				},
				{
					"symbol": "068290",
					"name": "삼성출판사",
					"sector": "업종 미확인",
					"marketCap": "57200000000",
					"changePct": "-0.35"
				},
				{
					"symbol": "011700",
					"name": "한신기계",
					"sector": "업종 미확인",
					"marketCap": "57170118062",
					"changePct": "-2.11"
				},
				{
					"symbol": "111110",
					"name": "호전실업",
					"sector": "업종 미확인",
					"marketCap": "56934480000",
					"changePct": "0.80"
				},
				{
					"symbol": "084680",
					"name": "이월드",
					"sector": "업종 미확인",
					"marketCap": "56211973716",
					"changePct": "-1.88"
				},
				{
					"symbol": "020760",
					"name": "일진디스플",
					"sector": "업종 미확인",
					"marketCap": "55503470462",
					"changePct": "0.00"
				},
				{
					"symbol": "004450",
					"name": "삼화왕관",
					"sector": "업종 미확인",
					"marketCap": "55367540300",
					"changePct": "-0.58"
				},
				{
					"symbol": "480370",
					"name": "씨케이솔루션",
					"sector": "업종 미확인",
					"marketCap": "55315837824",
					"changePct": "-3.29"
				},
				{
					"symbol": "009200",
					"name": "무림페이퍼",
					"sector": "업종 미확인",
					"marketCap": "54757851960",
					"changePct": "-3.09"
				},
				{
					"symbol": "075180",
					"name": "새론오토모티브",
					"sector": "업종 미확인",
					"marketCap": "54624000000",
					"changePct": "-0.70"
				},
				{
					"symbol": "004440",
					"name": "삼일씨엔에스",
					"sector": "업종 미확인",
					"marketCap": "54492733160",
					"changePct": "-1.83"
				},
				{
					"symbol": "004410",
					"name": "서울식품",
					"sector": "업종 미확인",
					"marketCap": "54447917940",
					"changePct": "-3.23"
				},
				{
					"symbol": "129260",
					"name": "인터지스",
					"sector": "업종 미확인",
					"marketCap": "54081634932",
					"changePct": "-0.82"
				},
				{
					"symbol": "002410",
					"name": "범양건영",
					"sector": "업종 미확인",
					"marketCap": "53173451700",
					"changePct": "0.00"
				},
				{
					"symbol": "18064K",
					"name": "한진칼우",
					"sector": "업종 미확인",
					"marketCap": "52870610900",
					"changePct": "29.99"
				},
				{
					"symbol": "071090",
					"name": "하이스틸",
					"sector": "업종 미확인",
					"marketCap": "52598781955",
					"changePct": "-6.46"
				},
				{
					"symbol": "214330",
					"name": "금호에이치티",
					"sector": "업종 미확인",
					"marketCap": "52493783580",
					"changePct": "-9.06"
				},
				{
					"symbol": "007280",
					"name": "한국특강",
					"sector": "업종 미확인",
					"marketCap": "51850237400",
					"changePct": "-0.06"
				},
				{
					"symbol": "0220WL",
					"name": "한화머시너리앤서비스홀딩스3우B",
					"sector": "업종 미확인",
					"marketCap": "51060542400",
					"changePct": "-5.26"
				},
				{
					"symbol": "014160",
					"name": "대영포장",
					"sector": "업종 미확인",
					"marketCap": "51053830695",
					"changePct": "-2.08"
				},
				{
					"symbol": "000950",
					"name": "전방",
					"sector": "업종 미확인",
					"marketCap": "50988000000",
					"changePct": "-0.49"
				},
				{
					"symbol": "004830",
					"name": "덕성",
					"sector": "업종 미확인",
					"marketCap": "50646400000",
					"changePct": "-0.46"
				},
				{
					"symbol": "058730",
					"name": "다스코",
					"sector": "업종 미확인",
					"marketCap": "50628127500",
					"changePct": "-4.94"
				},
				{
					"symbol": "011330",
					"name": "유니켐",
					"sector": "업종 미확인",
					"marketCap": "50594859200",
					"changePct": "-0.98"
				},
				{
					"symbol": "007815",
					"name": "코리아써우",
					"sector": "업종 미확인",
					"marketCap": "50429376900",
					"changePct": "-4.97"
				},
				{
					"symbol": "007610",
					"name": "선도전기",
					"sector": "업종 미확인",
					"marketCap": "50400000000",
					"changePct": "-5.56"
				},
				{
					"symbol": "003925",
					"name": "남양유업우",
					"sector": "업종 미확인",
					"marketCap": "50115448500",
					"changePct": "-3.46"
				},
				{
					"symbol": "005305",
					"name": "롯데칠성우",
					"sector": "업종 미확인",
					"marketCap": "49929964000",
					"changePct": "-1.38"
				},
				{
					"symbol": "001465",
					"name": "BYC우",
					"sector": "업종 미확인",
					"marketCap": "49861627500",
					"changePct": "0.43"
				},
				{
					"symbol": "092440",
					"name": "기신정기",
					"sector": "업종 미확인",
					"marketCap": "49844400000",
					"changePct": "-1.61"
				},
				{
					"symbol": "006880",
					"name": "신송홀딩스",
					"sector": "업종 미확인",
					"marketCap": "49622059310",
					"changePct": "1.33"
				},
				{
					"symbol": "025530",
					"name": "SJM홀딩스",
					"sector": "업종 미확인",
					"marketCap": "49356896440",
					"changePct": "-0.60"
				},
				{
					"symbol": "006125",
					"name": "SK디스커버리우",
					"sector": "업종 미확인",
					"marketCap": "49268200000",
					"changePct": "-1.23"
				},
				{
					"symbol": "006890",
					"name": "태경케미컬",
					"sector": "업종 미확인",
					"marketCap": "48894000000",
					"changePct": "-2.20"
				},
				{
					"symbol": "072130",
					"name": "유엔젤",
					"sector": "업종 미확인",
					"marketCap": "48750543360",
					"changePct": "0.79"
				},
				{
					"symbol": "003465",
					"name": "유화증권우",
					"sector": "업종 미확인",
					"marketCap": "48584461500",
					"changePct": "-0.71"
				},
				{
					"symbol": "011000",
					"name": "진원생명과학",
					"sector": "업종 미확인",
					"marketCap": "48531471270",
					"changePct": "0.00"
				},
				{
					"symbol": "005870",
					"name": "휴니드",
					"sector": "업종 미확인",
					"marketCap": "48417931450",
					"changePct": "-5.90"
				},
				{
					"symbol": "004770",
					"name": "써니전자",
					"sector": "업종 미확인",
					"marketCap": "47615474358",
					"changePct": "-2.05"
				},
				{
					"symbol": "001550",
					"name": "조비",
					"sector": "업종 미확인",
					"marketCap": "47612831630",
					"changePct": "-1.61"
				},
				{
					"symbol": "123700",
					"name": "SJM",
					"sector": "업종 미확인",
					"marketCap": "47126791960",
					"changePct": "-1.95"
				},
				{
					"symbol": "009320",
					"name": "아진전자부품",
					"sector": "업종 미확인",
					"marketCap": "47081280350",
					"changePct": "-1.24"
				},
				{
					"symbol": "012690",
					"name": "모나리자",
					"sector": "업종 미확인",
					"marketCap": "46482065105",
					"changePct": "-2.68"
				},
				{
					"symbol": "28513K",
					"name": "SK케미칼우",
					"sector": "업종 미확인",
					"marketCap": "46433666550",
					"changePct": "-2.23"
				},
				{
					"symbol": "069460",
					"name": "대호에이엘",
					"sector": "업종 미확인",
					"marketCap": "46322277400",
					"changePct": "0.00"
				},
				{
					"symbol": "003475",
					"name": "유안타증권우",
					"sector": "업종 미확인",
					"marketCap": "46120932000",
					"changePct": "-3.23"
				},
				{
					"symbol": "101140",
					"name": "인바이오젠",
					"sector": "업종 미확인",
					"marketCap": "45851846040",
					"changePct": "-2.56"
				},
				{
					"symbol": "372910",
					"name": "한컴라이프케어",
					"sector": "업종 미확인",
					"marketCap": "45718118712",
					"changePct": "-3.73"
				},
				{
					"symbol": "074610",
					"name": "이엔플러스",
					"sector": "업종 미확인",
					"marketCap": "44815400070",
					"changePct": "0.00"
				},
				{
					"symbol": "084870",
					"name": "TBH글로벌",
					"sector": "업종 미확인",
					"marketCap": "44701289360",
					"changePct": "0.00"
				},
				{
					"symbol": "023810",
					"name": "인팩",
					"sector": "업종 미확인",
					"marketCap": "44150000000",
					"changePct": "-1.78"
				},
				{
					"symbol": "001620",
					"name": "케이비아이동국실업",
					"sector": "업종 미확인",
					"marketCap": "44049781274",
					"changePct": "0.00"
				},
				{
					"symbol": "010770",
					"name": "평화홀딩스",
					"sector": "업종 미확인",
					"marketCap": "43949525330",
					"changePct": "-0.50"
				},
				{
					"symbol": "003080",
					"name": "SB성보",
					"sector": "업종 미확인",
					"marketCap": "42842800000",
					"changePct": "-0.23"
				},
				{
					"symbol": "378850",
					"name": "화승알앤에이",
					"sector": "업종 미확인",
					"marketCap": "42450747405",
					"changePct": "-4.69"
				},
				{
					"symbol": "090080",
					"name": "평화산업",
					"sector": "업종 미확인",
					"marketCap": "42164934912",
					"changePct": "-1.54"
				},
				{
					"symbol": "000725",
					"name": "현대건설우",
					"sector": "업종 미확인",
					"marketCap": "41765842800",
					"changePct": "-2.70"
				},
				{
					"symbol": "019490",
					"name": "엑시큐어하이트론",
					"sector": "업종 미확인",
					"marketCap": "41349858070",
					"changePct": "0.00"
				},
				{
					"symbol": "002140",
					"name": "고려산업",
					"sector": "업종 미확인",
					"marketCap": "41100172400",
					"changePct": "-1.38"
				},
				{
					"symbol": "37550K",
					"name": "DL이앤씨우",
					"sector": "업종 미확인",
					"marketCap": "40607730850",
					"changePct": "-2.24"
				},
				{
					"symbol": "017040",
					"name": "광명전기",
					"sector": "업종 미확인",
					"marketCap": "40390657180",
					"changePct": "0.00"
				},
				{
					"symbol": "004540",
					"name": "깨끗한나라",
					"sector": "업종 미확인",
					"marketCap": "40108226361",
					"changePct": "-1.01"
				},
				{
					"symbol": "35320K",
					"name": "대덕전자1우",
					"sector": "업종 미확인",
					"marketCap": "40045368090",
					"changePct": "-10.07"
				},
				{
					"symbol": "002360",
					"name": "SH에너지화학",
					"sector": "업종 미확인",
					"marketCap": "40008142800",
					"changePct": "-0.28"
				},
				{
					"symbol": "041650",
					"name": "상신브레이크",
					"sector": "업종 미확인",
					"marketCap": "39958368450",
					"changePct": "2.99"
				},
				{
					"symbol": "002920",
					"name": "유성기업",
					"sector": "업종 미확인",
					"marketCap": "39647780000",
					"changePct": "-1.61"
				},
				{
					"symbol": "145270",
					"name": "케이탑리츠",
					"sector": "업종 미확인",
					"marketCap": "39169530810",
					"changePct": "1.24"
				},
				{
					"symbol": "446070",
					"name": "유니드비티플러스",
					"sector": "업종 미확인",
					"marketCap": "38624822600",
					"changePct": "0.28"
				},
				{
					"symbol": "008870",
					"name": "금비",
					"sector": "업종 미확인",
					"marketCap": "38500000000",
					"changePct": "1.32"
				},
				{
					"symbol": "357250",
					"name": "미래에셋맵스리츠",
					"sector": "업종 미확인",
					"marketCap": "38367486175",
					"changePct": "-0.90"
				},
				{
					"symbol": "092780",
					"name": "DYP",
					"sector": "업종 미확인",
					"marketCap": "38122691700",
					"changePct": "0.87"
				},
				{
					"symbol": "007460",
					"name": "에이프로젠",
					"sector": "업종 미확인",
					"marketCap": "38115922290",
					"changePct": "-13.05"
				},
				{
					"symbol": "021050",
					"name": "서원",
					"sector": "업종 미확인",
					"marketCap": "37979672000",
					"changePct": "-1.96"
				},
				{
					"symbol": "049800",
					"name": "우진플라임",
					"sector": "업종 미확인",
					"marketCap": "37700000000",
					"changePct": "5.48"
				},
				{
					"symbol": "009190",
					"name": "대양금속",
					"sector": "업종 미확인",
					"marketCap": "37299515250",
					"changePct": "0.00"
				},
				{
					"symbol": "008420",
					"name": "문배철강",
					"sector": "업종 미확인",
					"marketCap": "36967819515",
					"changePct": "-4.40"
				},
				{
					"symbol": "009810",
					"name": "MDS스피어",
					"sector": "업종 미확인",
					"marketCap": "36592277488",
					"changePct": "1.30"
				},
				{
					"symbol": "012280",
					"name": "영화금속",
					"sector": "업종 미확인",
					"marketCap": "36194443025",
					"changePct": "0.95"
				},
				{
					"symbol": "005320",
					"name": "온타이드",
					"sector": "업종 미확인",
					"marketCap": "36136552165",
					"changePct": "-1.67"
				},
				{
					"symbol": "011390",
					"name": "부산산업",
					"sector": "업종 미확인",
					"marketCap": "36062400000",
					"changePct": "-13.76"
				},
				{
					"symbol": "004910",
					"name": "조광페인트",
					"sector": "업종 미확인",
					"marketCap": "35904000000",
					"changePct": "-2.26"
				},
				{
					"symbol": "011300",
					"name": "우성머티리얼스",
					"sector": "업종 미확인",
					"marketCap": "35716311498",
					"changePct": "-3.11"
				},
				{
					"symbol": "023350",
					"name": "한국종합기술",
					"sector": "업종 미확인",
					"marketCap": "35697000000",
					"changePct": "-2.10"
				},
				{
					"symbol": "004060",
					"name": "SG세계물산",
					"sector": "업종 미확인",
					"marketCap": "35424368000",
					"changePct": "-2.40"
				},
				{
					"symbol": "023960",
					"name": "에쓰씨엔지니어링",
					"sector": "업종 미확인",
					"marketCap": "34878987241",
					"changePct": "-1.29"
				},
				{
					"symbol": "000890",
					"name": "보해양조",
					"sector": "업종 미확인",
					"marketCap": "34806271500",
					"changePct": "2.69"
				},
				{
					"symbol": "002630",
					"name": "오리엔트바이오",
					"sector": "업종 미확인",
					"marketCap": "34774465923",
					"changePct": "1.73"
				},
				{
					"symbol": "026940",
					"name": "부국철강",
					"sector": "업종 미확인",
					"marketCap": "34600000000",
					"changePct": "-4.10"
				},
				{
					"symbol": "027740",
					"name": "마니커",
					"sector": "업종 미확인",
					"marketCap": "34600740910",
					"changePct": "-1.80"
				},
				{
					"symbol": "003060",
					"name": "에이프로젠바이오로직스",
					"sector": "업종 미확인",
					"marketCap": "34290631140",
					"changePct": "-3.31"
				},
				{
					"symbol": "133820",
					"name": "화인베스틸",
					"sector": "업종 미확인",
					"marketCap": "34256685346",
					"changePct": "-11.08"
				},
				{
					"symbol": "017180",
					"name": "명문제약",
					"sector": "업종 미확인",
					"marketCap": "34157174724",
					"changePct": "-2.04"
				},
				{
					"symbol": "481850",
					"name": "신한글로벌액티브리츠",
					"sector": "업종 미확인",
					"marketCap": "33956055584",
					"changePct": "-1.88"
				},
				{
					"symbol": "000910",
					"name": "유니온",
					"sector": "업종 미확인",
					"marketCap": "33877213230",
					"changePct": "-4.62"
				},
				{
					"symbol": "013000",
					"name": "세우글로벌",
					"sector": "업종 미확인",
					"marketCap": "33757116456",
					"changePct": "-1.09"
				},
				{
					"symbol": "002870",
					"name": "신풍",
					"sector": "업종 미확인",
					"marketCap": "33700186800",
					"changePct": "-2.43"
				},
				{
					"symbol": "143210",
					"name": "핸즈코퍼레이션",
					"sector": "업종 미확인",
					"marketCap": "33571739817",
					"changePct": "0.00"
				},
				{
					"symbol": "011230",
					"name": "삼화전자",
					"sector": "업종 미확인",
					"marketCap": "33540123750",
					"changePct": "-4.84"
				},
				{
					"symbol": "012170",
					"name": "아센디오",
					"sector": "업종 미확인",
					"marketCap": "33482631000",
					"changePct": "-3.13"
				},
				{
					"symbol": "009835",
					"name": "한화솔루션우",
					"sector": "업종 미확인",
					"marketCap": "33258131120",
					"changePct": "-4.46"
				},
				{
					"symbol": "000215",
					"name": "DL우",
					"sector": "업종 미확인",
					"marketCap": "33149020900",
					"changePct": "-0.66"
				},
				{
					"symbol": "134790",
					"name": "시디즈",
					"sector": "업종 미확인",
					"marketCap": "32320000000",
					"changePct": "-1.28"
				},
				{
					"symbol": "000760",
					"name": "이화산업",
					"sector": "업종 미확인",
					"marketCap": "31780000000",
					"changePct": "-1.73"
				},
				{
					"symbol": "002880",
					"name": "디와이에이",
					"sector": "업종 미확인",
					"marketCap": "31478898635",
					"changePct": "-4.40"
				},
				{
					"symbol": "011420",
					"name": "갤럭시아에스엠",
					"sector": "업종 미확인",
					"marketCap": "30442356620",
					"changePct": "-0.90"
				},
				{
					"symbol": "024070",
					"name": "WISCOM",
					"sector": "업종 미확인",
					"marketCap": "30331020802",
					"changePct": "-0.20"
				},
				{
					"symbol": "001070",
					"name": "대한방직",
					"sector": "업종 미확인",
					"marketCap": "30210000000",
					"changePct": "-2.06"
				},
				{
					"symbol": "003495",
					"name": "대한항공우",
					"sector": "업종 미확인",
					"marketCap": "30157975650",
					"changePct": "12.42"
				},
				{
					"symbol": "014990",
					"name": "인디에프",
					"sector": "업종 미확인",
					"marketCap": "30000130203",
					"changePct": "-25.62"
				},
				{
					"symbol": "005820",
					"name": "원림",
					"sector": "업종 미확인",
					"marketCap": "29896589700",
					"changePct": "-0.61"
				},
				{
					"symbol": "004920",
					"name": "씨아이테크",
					"sector": "업종 미확인",
					"marketCap": "29888039600",
					"changePct": "4.29"
				},
				{
					"symbol": "025890",
					"name": "한국주강",
					"sector": "업종 미확인",
					"marketCap": "29588955480",
					"changePct": "1.14"
				},
				{
					"symbol": "036420",
					"name": "콘텐트리중앙",
					"sector": "업종 미확인",
					"marketCap": "29355757392",
					"changePct": "0.46"
				},
				{
					"symbol": "396690",
					"name": "미래에셋글로벌리츠",
					"sector": "업종 미확인",
					"marketCap": "29308395600",
					"changePct": "-2.63"
				},
				{
					"symbol": "007110",
					"name": "일신석재",
					"sector": "업종 미확인",
					"marketCap": "28999754784",
					"changePct": "-11.28"
				},
				{
					"symbol": "008250",
					"name": "이건산업",
					"sector": "업종 미확인",
					"marketCap": "28860193225",
					"changePct": "-1.50"
				},
				{
					"symbol": "014910",
					"name": "성문전자",
					"sector": "업종 미확인",
					"marketCap": "28348862329",
					"changePct": "-7.56"
				},
				{
					"symbol": "004365",
					"name": "세방우",
					"sector": "업종 미확인",
					"marketCap": "28296547500",
					"changePct": "-1.29"
				},
				{
					"symbol": "006370",
					"name": "대구백화점",
					"sector": "업종 미확인",
					"marketCap": "28136188600",
					"changePct": "0.78"
				},
				{
					"symbol": "088790",
					"name": "진도",
					"sector": "업종 미확인",
					"marketCap": "28131901440",
					"changePct": "-0.22"
				},
				{
					"symbol": "006740",
					"name": "블루산업개발",
					"sector": "업종 미확인",
					"marketCap": "27848380350",
					"changePct": "-0.32"
				},
				{
					"symbol": "009460",
					"name": "한창제지",
					"sector": "업종 미확인",
					"marketCap": "27764293500",
					"changePct": "1.12"
				},
				{
					"symbol": "014130",
					"name": "한익스프레스",
					"sector": "업종 미확인",
					"marketCap": "27653846220",
					"changePct": "1.30"
				},
				{
					"symbol": "069640",
					"name": "한세엠케이",
					"sector": "업종 미확인",
					"marketCap": "26495551339",
					"changePct": "-5.72"
				},
				{
					"symbol": "006570",
					"name": "대림통상",
					"sector": "업종 미확인",
					"marketCap": "26430600000",
					"changePct": "-1.14"
				},
				{
					"symbol": "007120",
					"name": "미래아이앤지",
					"sector": "업종 미확인",
					"marketCap": "26366805010",
					"changePct": "1.79"
				},
				{
					"symbol": "090370",
					"name": "메타랩스",
					"sector": "업종 미확인",
					"marketCap": "26294415507",
					"changePct": "-5.59"
				},
				{
					"symbol": "003535",
					"name": "한화투자증권우",
					"sector": "업종 미확인",
					"marketCap": "25968000000",
					"changePct": "-5.25"
				},
				{
					"symbol": "010400",
					"name": "우진아이엔에스",
					"sector": "업종 미확인",
					"marketCap": "25381260000",
					"changePct": "-6.46"
				},
				{
					"symbol": "009140",
					"name": "케이아이이",
					"sector": "업종 미확인",
					"marketCap": "25021073280",
					"changePct": "-8.02"
				},
				{
					"symbol": "308170",
					"name": "씨티알모빌리티",
					"sector": "업종 미확인",
					"marketCap": "24753750000",
					"changePct": "-3.04"
				},
				{
					"symbol": "019175",
					"name": "신풍제약우",
					"sector": "업종 미확인",
					"marketCap": "23755373900",
					"changePct": "-0.17"
				},
				{
					"symbol": "033250",
					"name": "체시스",
					"sector": "업종 미확인",
					"marketCap": "23680000000",
					"changePct": "-7.38"
				},
				{
					"symbol": "002355",
					"name": "넥센타이어1우B",
					"sector": "업종 미확인",
					"marketCap": "23432500000",
					"changePct": "-2.30"
				},
				{
					"symbol": "009310",
					"name": "참엔지니어링",
					"sector": "업종 미확인",
					"marketCap": "23329484620",
					"changePct": "0.00"
				},
				{
					"symbol": "33637K",
					"name": "솔루스첨단소재1우",
					"sector": "업종 미확인",
					"marketCap": "23230347156",
					"changePct": "2.08"
				},
				{
					"symbol": "030720",
					"name": "동원수산",
					"sector": "업종 미확인",
					"marketCap": "22826913525",
					"changePct": "-2.49"
				},
				{
					"symbol": "004870",
					"name": "티웨이홀딩스",
					"sector": "업종 미확인",
					"marketCap": "22610065302",
					"changePct": "-6.90"
				},
				{
					"symbol": "023150",
					"name": "MH에탄올",
					"sector": "업종 미확인",
					"marketCap": "22312755934",
					"changePct": "-1.64"
				},
				{
					"symbol": "047400",
					"name": "유니온머티리얼",
					"sector": "업종 미확인",
					"marketCap": "21252000000",
					"changePct": "-8.83"
				},
				{
					"symbol": "000040",
					"name": "다이나맥",
					"sector": "업종 미확인",
					"marketCap": "21130988664",
					"changePct": "-0.56"
				},
				{
					"symbol": "012160",
					"name": "영흥",
					"sector": "업종 미확인",
					"marketCap": "21009845535",
					"changePct": "-1.82"
				},
				{
					"symbol": "003680",
					"name": "한성기업",
					"sector": "업종 미확인",
					"marketCap": "20988160700",
					"changePct": "-5.59"
				},
				{
					"symbol": "008775",
					"name": "호텔신라우",
					"sector": "업종 미확인",
					"marketCap": "20601484600",
					"changePct": "-0.36"
				},
				{
					"symbol": "015020",
					"name": "이스타코",
					"sector": "업종 미확인",
					"marketCap": "19883142400",
					"changePct": "0.00"
				},
				{
					"symbol": "011090",
					"name": "에넥스",
					"sector": "업종 미확인",
					"marketCap": "19160999264",
					"changePct": "-2.00"
				},
				{
					"symbol": "001685",
					"name": "대상우",
					"sector": "업종 미확인",
					"marketCap": "19046099700",
					"changePct": "-0.07"
				},
				{
					"symbol": "33626L",
					"name": "두산퓨얼셀2우B",
					"sector": "업종 미확인",
					"marketCap": "18963005000",
					"changePct": "-3.64"
				},
				{
					"symbol": "357430",
					"name": "마스턴프리미어리츠",
					"sector": "업종 미확인",
					"marketCap": "18577731963",
					"changePct": "0.16"
				},
				{
					"symbol": "002690",
					"name": "동일제강",
					"sector": "업종 미확인",
					"marketCap": "18513928320",
					"changePct": "-0.76"
				},
				{
					"symbol": "00499K",
					"name": "롯데지주우",
					"sector": "업종 미확인",
					"marketCap": "18126067500",
					"changePct": "-2.17"
				},
				{
					"symbol": "118000",
					"name": "메타케어",
					"sector": "업종 미확인",
					"marketCap": "17887241635",
					"changePct": "-0.73"
				},
				{
					"symbol": "006345",
					"name": "대원전선우",
					"sector": "업종 미확인",
					"marketCap": "17824160000",
					"changePct": "-5.29"
				},
				{
					"symbol": "008600",
					"name": "윌비스",
					"sector": "업종 미확인",
					"marketCap": "17615839860",
					"changePct": "0.00"
				},
				{
					"symbol": "009440",
					"name": "KC그린홀딩스",
					"sector": "업종 미확인",
					"marketCap": "17568790596",
					"changePct": "0.00"
				},
				{
					"symbol": "005360",
					"name": "모나미",
					"sector": "업종 미확인",
					"marketCap": "16818603230",
					"changePct": "-5.22"
				},
				{
					"symbol": "108675",
					"name": "LX하우시스우",
					"sector": "업종 미확인",
					"marketCap": "16723746000",
					"changePct": "-2.11"
				},
				{
					"symbol": "006490",
					"name": "프리티",
					"sector": "업종 미확인",
					"marketCap": "16681553020",
					"changePct": "0.00"
				},
				{
					"symbol": "093240",
					"name": "형지엘리트",
					"sector": "업종 미확인",
					"marketCap": "16501700544",
					"changePct": "-6.67"
				},
				{
					"symbol": "004270",
					"name": "남성",
					"sector": "업종 미확인",
					"marketCap": "16370859520",
					"changePct": "-7.12"
				},
				{
					"symbol": "005725",
					"name": "넥센우",
					"sector": "업종 미확인",
					"marketCap": "15158526000",
					"changePct": "-0.47"
				},
				{
					"symbol": "025750",
					"name": "한솔홈데코",
					"sector": "업종 미확인",
					"marketCap": "14920664854",
					"changePct": "-2.63"
				},
				{
					"symbol": "001420",
					"name": "태원물산",
					"sector": "업종 미확인",
					"marketCap": "14918800000",
					"changePct": "-7.62"
				},
				{
					"symbol": "002070",
					"name": "비비안",
					"sector": "업종 미확인",
					"marketCap": "14237337000",
					"changePct": "-0.34"
				},
				{
					"symbol": "004105",
					"name": "태양금속우",
					"sector": "업종 미확인",
					"marketCap": "14124000000",
					"changePct": "-3.93"
				},
				{
					"symbol": "005257",
					"name": "녹십자홀딩스2우",
					"sector": "업종 미확인",
					"marketCap": "14085733500",
					"changePct": "0.79"
				},
				{
					"symbol": "001795",
					"name": "대한제당우",
					"sector": "업종 미확인",
					"marketCap": "13613796000",
					"changePct": "0.24"
				},
				{
					"symbol": "000087",
					"name": "하이트진로2우B",
					"sector": "업종 미확인",
					"marketCap": "13561656000",
					"changePct": "-0.99"
				},
				{
					"symbol": "00781K",
					"name": "코리아써키트2우B",
					"sector": "업종 미확인",
					"marketCap": "12993729420",
					"changePct": "0.85"
				},
				{
					"symbol": "002025",
					"name": "코오롱우",
					"sector": "업종 미확인",
					"marketCap": "12904059440",
					"changePct": "1.00"
				},
				{
					"symbol": "001380",
					"name": "SG글로벌",
					"sector": "업종 미확인",
					"marketCap": "12477549405",
					"changePct": "-15.40"
				},
				{
					"symbol": "00806K",
					"name": "대덕1우",
					"sector": "업종 미확인",
					"marketCap": "12232682130",
					"changePct": "-3.90"
				},
				{
					"symbol": "084695",
					"name": "대상홀딩스우",
					"sector": "업종 미확인",
					"marketCap": "12048827580",
					"changePct": "-0.83"
				},
				{
					"symbol": "006200",
					"name": "한국전자홀딩스",
					"sector": "업종 미확인",
					"marketCap": "11212008490",
					"changePct": "-6.88"
				},
				{
					"symbol": "145995",
					"name": "삼양사우",
					"sector": "업종 미확인",
					"marketCap": "11176114000",
					"changePct": "0.00"
				},
				{
					"symbol": "002820",
					"name": "SUN&L",
					"sector": "업종 미확인",
					"marketCap": "11025768456",
					"changePct": "-0.33"
				},
				{
					"symbol": "071950",
					"name": "코아스",
					"sector": "업종 미확인",
					"marketCap": "10656426715",
					"changePct": "1.10"
				},
				{
					"symbol": "465770",
					"name": "STX그린로지스",
					"sector": "업종 미확인",
					"marketCap": "10654328880",
					"changePct": "-3.84"
				},
				{
					"symbol": "0120X0",
					"name": "유진 챔피언중단기크레딧 X클래스",
					"sector": "업종 미확인",
					"marketCap": "10654869300",
					"changePct": "0.05"
				},
				{
					"symbol": "0106J0",
					"name": "대신 KOSPI200인덱스 X클래스",
					"sector": "업종 미확인",
					"marketCap": "10530000000",
					"changePct": "-5.58"
				},
				{
					"symbol": "024890",
					"name": "대원화성",
					"sector": "업종 미확인",
					"marketCap": "10477284100",
					"changePct": "-2.76"
				},
				{
					"symbol": "38380K",
					"name": "LX홀딩스1우",
					"sector": "업종 미확인",
					"marketCap": "10271647850",
					"changePct": "-4.76"
				},
				{
					"symbol": "001067",
					"name": "JW중외제약2우B",
					"sector": "업종 미확인",
					"marketCap": "10068205350",
					"changePct": "0.31"
				},
				{
					"symbol": "45226K",
					"name": "한화갤러리아우",
					"sector": "업종 미확인",
					"marketCap": "10034943850",
					"changePct": "-1.85"
				},
				{
					"symbol": "019685",
					"name": "대교우B",
					"sector": "업종 미확인",
					"marketCap": "9694068010",
					"changePct": "1.32"
				},
				{
					"symbol": "004255",
					"name": "NPC우",
					"sector": "업종 미확인",
					"marketCap": "9567360000",
					"changePct": "0.22"
				},
				{
					"symbol": "145210",
					"name": "다이나믹디자인",
					"sector": "업종 미확인",
					"marketCap": "9461011840",
					"changePct": "0.00"
				},
				{
					"symbol": "001755",
					"name": "한양증권우",
					"sector": "업종 미확인",
					"marketCap": "8705536700",
					"changePct": "-0.91"
				},
				{
					"symbol": "015260",
					"name": "에이엔피",
					"sector": "업종 미확인",
					"marketCap": "8056988874",
					"changePct": "0.00"
				},
				{
					"symbol": "003075",
					"name": "코오롱글로벌우",
					"sector": "업종 미확인",
					"marketCap": "7836997460",
					"changePct": "-0.84"
				},
				{
					"symbol": "004835",
					"name": "덕성우",
					"sector": "업종 미확인",
					"marketCap": "7767360000",
					"changePct": "-4.29"
				},
				{
					"symbol": "000225",
					"name": "유유제약1우",
					"sector": "업종 미확인",
					"marketCap": "7548876900",
					"changePct": "-3.34"
				},
				{
					"symbol": "001065",
					"name": "JW중외제약우",
					"sector": "업종 미확인",
					"marketCap": "7078385700",
					"changePct": "0.00"
				},
				{
					"symbol": "004985",
					"name": "성신양회우",
					"sector": "업종 미확인",
					"marketCap": "6694369500",
					"changePct": "5.57"
				},
				{
					"symbol": "000325",
					"name": "노루홀딩스우",
					"sector": "업종 미확인",
					"marketCap": "6636982750",
					"changePct": "0.00"
				},
				{
					"symbol": "33637L",
					"name": "솔루스첨단소재2우B",
					"sector": "업종 미확인",
					"marketCap": "6494196348",
					"changePct": "0.35"
				},
				{
					"symbol": "001515",
					"name": "SK증권우",
					"sector": "업종 미확인",
					"marketCap": "6475210670",
					"changePct": "-4.06"
				},
				{
					"symbol": "044380",
					"name": "주연테크",
					"sector": "업종 미확인",
					"marketCap": "6058793776",
					"changePct": "0.00"
				},
				{
					"symbol": "090355",
					"name": "노루페인트우",
					"sector": "업종 미확인",
					"marketCap": "5613087120",
					"changePct": "-0.49"
				},
				{
					"symbol": "012205",
					"name": "계양전기우",
					"sector": "업종 미확인",
					"marketCap": "5553125250",
					"changePct": "-2.46"
				},
				{
					"symbol": "26490K",
					"name": "크라운제과우",
					"sector": "업종 미확인",
					"marketCap": "5515482800",
					"changePct": "-0.28"
				},
				{
					"symbol": "002995",
					"name": "금호건설우",
					"sector": "업종 미확인",
					"marketCap": "4804853040",
					"changePct": "-8.77"
				},
				{
					"symbol": "001770",
					"name": "SHD",
					"sector": "업종 미확인",
					"marketCap": "4768396150",
					"changePct": "0.00"
				},
				{
					"symbol": "000545",
					"name": "흥국화재우",
					"sector": "업종 미확인",
					"marketCap": "4224000000",
					"changePct": "-4.84"
				},
				{
					"symbol": "000145",
					"name": "하이트진로홀딩스우",
					"sector": "업종 미확인",
					"marketCap": "3983052600",
					"changePct": "-1.51"
				},
				{
					"symbol": "009415",
					"name": "태영건설우",
					"sector": "업종 미확인",
					"marketCap": "3737350500",
					"changePct": "-3.52"
				},
				{
					"symbol": "014825",
					"name": "동원시스템즈우",
					"sector": "업종 미확인",
					"marketCap": "3517958520",
					"changePct": "-1.26"
				},
				{
					"symbol": "005965",
					"name": "동부건설우",
					"sector": "업종 미확인",
					"marketCap": "3487559400",
					"changePct": "-1.47"
				},
				{
					"symbol": "014285",
					"name": "금강공업우",
					"sector": "업종 미확인",
					"marketCap": "3138135000",
					"changePct": "-3.27"
				},
				{
					"symbol": "36328K",
					"name": "티와이홀딩스우",
					"sector": "업종 미확인",
					"marketCap": "3137113830",
					"changePct": "-3.26"
				},
				{
					"symbol": "007575",
					"name": "일양약품우",
					"sector": "업종 미확인",
					"marketCap": "3022093200",
					"changePct": "1.49"
				},
				{
					"symbol": "005745",
					"name": "크라운해태홀딩스우",
					"sector": "업종 미확인",
					"marketCap": "2829419460",
					"changePct": "-5.42"
				},
				{
					"symbol": "000227",
					"name": "유유제약2우B",
					"sector": "업종 미확인",
					"marketCap": "2376985600",
					"changePct": "-1.21"
				},
				{
					"symbol": "014915",
					"name": "성문전자우",
					"sector": "업종 미확인",
					"marketCap": "2367000000",
					"changePct": "-6.41"
				},
				{
					"symbol": "008355",
					"name": "남선알미우",
					"sector": "업종 미확인",
					"marketCap": "2179861200",
					"changePct": "0.14"
				},
				{
					"symbol": "001525",
					"name": "동양우",
					"sector": "업종 미확인",
					"marketCap": "1756894350",
					"changePct": "2.76"
				},
				{
					"symbol": "004545",
					"name": "깨끗한나라우",
					"sector": "업종 미확인",
					"marketCap": "1739260000",
					"changePct": "1.06"
				},
				{
					"symbol": "001527",
					"name": "동양2우B",
					"sector": "업종 미확인",
					"marketCap": "781679000",
					"changePct": "4.97"
				}
			]
		};
	})))();
}
/** Internal personal-use observations only; structural parsing does not authenticate external input. */
function loadBundledPersonalHeatmap(...args) {
	if (args.length) throw new Error("외부 히트맵 입력은 허용하지 않습니다.");
	return { kospi: parseMarketSnapshot(kospi_default, "kospi", kospi_default.asOf) };
}
function init_bundledPersonalHeatmap() {
	return (init_bundledPersonalHeatmap = __esmMin((() => {
		init_kospi();
		init_marketSnapshot();
	})))();
}
function PersonalHeatmapInformation() {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(MarketNamedPanel, {
		className: "market-heatmap-help",
		title: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(import_jsx_runtime$1.Fragment, { children: "코스피 자료 안내" }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "Npay 코스피 시장 공급자 명부 · 우선주 포함. 수신 937/937종목은 공급자 명부 수신 범위이며 공식 KRX 지수 구성 검증이 아닙니다. 지수 카드·추이 계산에 사용하지 않습니다." }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "시가총액은 KRW 원 단위 원문, 색은 공급자 전일 대비 일간 등락입니다. 주·월·연 자료와 나머지 시장은 미연결입니다." }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "관측 2026-11-20 20:20:17~20:20:24 KST · 가장 이른 관측을 기준시각으로 표시합니다. 동시관측·실시간·공식 종가를 뜻하지 않습니다. 수신 2026-11-22 13:44:46~15:38:17 KST." }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "업종은 삼성전자·삼성전자우만 확인했습니다. 나머지는 업종 미확인이며, 특정 업종에 종목이 없다고 단정하지 않습니다. 고정 관측 자료이며 자동 갱신하지 않습니다." })
		]
	});
}
var import_jsx_runtime$1;
function init_PersonalHeatmapInformation() {
	return (init_PersonalHeatmapInformation = __esmMin((() => {
		init_MarketNamedPanel();
		import_jsx_runtime$1 = require_jsx_runtime();
	})))();
}
function init_public_heatmap_layout() {
	return (init_public_heatmap_layout = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/public-reference/public-heatmap-layout.css?v=source-build-r50126010";
			document.head.appendChild(l);
		}
	})))();
}
function validIds(value) {
	return Array.isArray(value) && value.length <= IDS.length && new Set(value).size === value.length && value.every((id) => typeof id === "string" && IDS.includes(id));
}
function nextPublicHeatmapPanelId(ids) {
	return IDS.find((id) => !ids.includes(id)) ?? null;
}
function readPublicHeatmapLayout(storage) {
	let raw = null;
	const fallback = () => ({
		raw,
		ids: IDS.slice(0, 1),
		writable: false
	});
	try {
		if (!storage) return fallback();
		raw = storage.getItem(KEY);
		if (raw === null) return {
			raw,
			ids: IDS.slice(0, 1),
			writable: true
		};
		if (raw.length > 4096) return fallback();
		const v = JSON.parse(raw);
		if (!v || typeof v !== "object" || Array.isArray(v) || Object.keys(v).sort().join(",") !== "ids,version") return fallback();
		const record = v;
		return record.version === 1 && validIds(record.ids) ? {
			raw,
			ids: [...record.ids],
			writable: true
		} : fallback();
	} catch {
		return fallback();
	}
}
function writePublicHeatmapLayout(storage, previous, ids) {
	try {
		if (!storage || !previous.writable || !validIds(ids) || storage.getItem(KEY) !== previous.raw) return { ok: false };
		const copy = [...ids], raw = JSON.stringify({
			version: 1,
			ids: copy
		});
		storage.setItem(KEY, raw);
		if (storage.getItem(KEY) !== raw) return { ok: false };
		return {
			ok: true,
			read: {
				raw,
				ids: copy,
				writable: true
			}
		};
	} catch {
		return { ok: false };
	}
}
function browserStorage() {
	try {
		return typeof window === "undefined" ? void 0 : window.localStorage;
	} catch {
		return;
	}
}
/** Only panel identities are stored here. Market/period/zoom retain their existing owner and key. */
function PublicHeatmapExplorer() {
	const [storage] = (0, import_react.useState)(browserStorage), [state, setState] = (0, import_react.useState)(() => {
		const read = readPublicHeatmapLayout(storage);
		return {
			read,
			error: !read.writable
		};
	});
	const live = (0, import_react.useRef)(state), root = (0, import_react.useRef)(null), addButton = (0, import_react.useRef)(null), pendingFocus = (0, import_react.useRef)(null);
	live.current = state;
	(0, import_react.useLayoutEffect)(() => {
		const id = pendingFocus.current;
		if (id === null) return;
		pendingFocus.current = null;
		(id === "add" ? addButton.current : root.current?.querySelector(`[data-heatmap-panel="${id}"] button[role="combobox"]`))?.focus();
	}, [state]);
	function commit(ids) {
		const result = writePublicHeatmapLayout(storage, live.current.read, ids), next = {
			read: result.read ?? {
				...live.current.read,
				ids: [...ids]
			},
			error: !result.ok
		};
		live.current = next;
		setState(next);
	}
	function add() {
		const id = nextPublicHeatmapPanelId(live.current.read.ids);
		if (id === null) return;
		pendingFocus.current = id;
		commit([...live.current.read.ids, id]);
	}
	function close(id) {
		pendingFocus.current = "add";
		commit(live.current.read.ids.filter((value) => value !== id));
	}
	const panels = state.read.ids.map((id) => ({
		id,
		label: `지도 ${IDS.indexOf(id) + 1}`,
		available: MARKET_UNIVERSES,
		...id === "market-left" ? { initialMarket: "kospi" } : id === "market-right" ? { initialMarket: "sp500" } : {}
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "public-heatmap-layout",
		ref: root,
		children: [
			state.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				children: "지도 구성을 저장하지 못했습니다. 이번 화면에만 적용하며 기존 저장 원문은 보존합니다."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndependentHeatmapPanels, {
				marketFirst: true,
				panels,
				sources: personalSources,
				personalInformation: { kospi: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonalHeatmapInformation, {}) },
				panelActions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					ref: addButton,
					className: "market-heatmap-add",
					type: "button",
					"aria-label": "지도 추가",
					"aria-description": "최대 16개 · 닫은 지도의 개별 설정은 보존됩니다",
					disabled: nextPublicHeatmapPanelId(state.read.ids) === null,
					onClick: add,
					children: "＋ 지도 추가"
				}),
				onClosePanel: close
			}),
			!panels.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "market-empty",
				children: "열린 지도가 없습니다. 지도 추가로 다시 열 수 있습니다."
			})
		]
	});
}
var import_react, import_jsx_runtime, KEY, IDS, personalSources;
function init_PublicHeatmapExplorer() {
	return (init_PublicHeatmapExplorer = __esmMin((() => {
		import_react = require_react();
		init_HeatmapExplorer();
		init_MarketHeatmap();
		init_bundledPersonalHeatmap();
		init_PersonalHeatmapInformation();
		init_public_heatmap_layout();
		import_jsx_runtime = require_jsx_runtime();
		KEY = "stockpin.heatmap-layout.v1";
		IDS = [
			"market-left",
			"market-right",
			...Array.from({ length: 14 }, (_, i) => `market-extra-${i + 3}`)
		];
		personalSources = loadBundledPersonalHeatmap();
	})))();
}
init_PublicHeatmapExplorer();
export { PublicHeatmapExplorer };
