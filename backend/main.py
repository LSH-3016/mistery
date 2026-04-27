from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
import random

app = FastAPI(title="Mystery Game API")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 데이터 풀
CASE_SCENARIOS = [
    {
        "title": "베이지 갤러리의 정전",
        "location": {"name": "베이지 갤러리 집무실", "description": "도심 외곽 프라이빗 전시관 3층 집무실"},
        "victim": {"name": "박민수", "age": 52, "role": "갤러리 관장", "company": "베이지 갤러리"},
        "cause_of_death": "차(Tea)에 희석된 청산가리 중독",
        "special_event": "사건 직전 5분간 원인 불명의 정전 발생",
        "discovery": "집무실 책상 앞에 앉은 채 사망. 마시다 만 찻잔과 전시 기획안이 책상 위에 놓여 있음.",
    },
    {
        "title": "심야 연구실의 비밀",
        "location": {"name": "생명공학 연구소 실험실", "description": "대학 부속 연구소 지하 1층 실험실"},
        "victim": {"name": "이준혁", "age": 45, "role": "수석 연구원", "company": "바이오텍 연구소"},
        "cause_of_death": "실험용 독극물 주입",
        "special_event": "사건 당일 연구소 출입 기록 시스템 오류 발생",
        "discovery": "실험대 앞에 쓰러진 채 발견. 주사기와 깨진 시약병이 바닥에 흩어져 있음.",
    },
    {
        "title": "고층 빌딩의 추락",
        "location": {"name": "스카이타워 회장실", "description": "도심 중심가 50층 회장실"},
        "victim": {"name": "정우진", "age": 58, "role": "회장", "company": "우진그룹"},
        "cause_of_death": "둔기에 의한 두부 손상 후 창밖으로 추락",
        "special_event": "사건 당일 임시 주주총회 개최 예정",
        "discovery": "건물 앞 보도에서 추락사한 채 발견. 회장실 창문이 열려 있었음.",
    }
]

SUSPECT_PROFILES = {
    "베이지 갤러리의 정전": [
        {
            "role": "전속 예술가",
            "relationship": "계약 작가",
            "motive_type": "복수",
            "background": "박 관장과 최근 계약 파기 문제로 심한 말다툼. 작품 세계를 무시하고 상업적 결과물만 요구한다며 불만 토로.",
            "alibi": "정전 당시 1층 전시실에서 작품 설치 작업 중이었다고 주장. 목격자 없음.",
            "appearance_hint": "옷에 베이지색 물감 얼룩이 여러 군데 묻어 있음. 손톱 사이에도 물감 자국.",
            "interview_q1": "박 관장과의 관계는 어땠나요?",
            "interview_a1": "처음엔... 좋았죠. 하지만 최근엔 제 예술을 이해하지 못했어요. 돈만 생각했죠.",
            "interview_q2": "정전 당시 어디 계셨나요?",
            "interview_a2": "1층에서 작품 설치하고 있었어요. 갑자기 불이 꺼져서 당황했죠.",
            "interview_q3": "라텍스 장갑에 묻은 베이지색 물감은?",
            "interview_a3": "제 작품에 쓰는 물감이긴 하지만... 저만 쓰는 건 아니에요. 갤러리에 흔한 색이죠."
        },
        {
            "role": "수석 큐레이터",
            "relationship": "직원",
            "motive_type": "금전",
            "background": "갤러리 실질적 운영 담당. 최근 공금 횡령 의혹으로 박 관장에게 조사받기 시작함.",
            "alibi": "정전 직후 복도에서 가장 먼저 발견됨. 2층 사무실에서 업무 중이었다고 주장.",
            "appearance_hint": "단정한 정장 차림. 하지만 이마에 땀이 많고 손이 미세하게 떨림.",
            "interview_q1": "횡령 의혹에 대해 해명해주시겠어요?",
            "interview_a1": "오해예요. 전시 준비 비용이 많이 들어서... 설명할 기회도 없이 의심받았어요.",
            "interview_q2": "보안 녹화 기록이 삭제된 것에 대해 아시나요?",
            "interview_a2": "저도 이상하다고 생각했어요. 누군가 의도적으로 지운 것 같은데... 저는 아니에요.",
            "interview_q3": "정전 직후 왜 복도에 계셨나요?",
            "interview_a3": "불이 나간 거 아닌가 걱정돼서 확인하러 나갔죠. 그게 잘못인가요?"
        },
        {
            "role": "보안 업체 직원",
            "relationship": "외부 협력업체",
            "motive_type": "금전",
            "background": "사건 당일 시스템 점검차 방문. 배전반 위치와 보안 카메라 사각지대 숙지. 도박 빚으로 사채업자에게 시달림.",
            "alibi": "지하 배전실에서 정기 점검 중이었다고 주장. 정전은 노후된 시스템 때문이라고 설명.",
            "appearance_hint": "유니폼 착용. 명찰이 삐뚤어져 있고, 신발에 흙이 묻어 있음.",
            "interview_q1": "도박 빚이 있다는 소문이 사실인가요?",
            "interview_a1": "...개인적인 일입니다. 일과는 무관해요.",
            "interview_q2": "배전반에서 발견된 고무줄과 퓨즈는?",
            "interview_a2": "정전 원인을 조사하다 발견했어요. 누군가 고의로 정전을 일으킨 것 같습니다.",
            "interview_q3": "보안 카메라 사각지대를 알고 계셨죠?",
            "interview_a3": "제 업무니까요. 하지만 그걸 악용한 적은 없어요."
        }
    ],
    "심야 연구실의 비밀": [
        {
            "role": "후배 연구원",
            "relationship": "제자",
            "motive_type": "복수",
            "background": "연구 성과를 피해자에게 빼앗김. 논문 저자 명단에서 제외됨.",
            "alibi": "실험실 반대편에서 실험 중이었다고 주장.",
            "appearance_hint": "흰 가운 착용. 가운 소매에 미세한 화학 물질 얼룩. 눈가에 다크서클.",
            "interview_q1": "이 수석 연구원과의 관계는?",
            "interview_a1": "스승이었죠... 하지만 제 연구를 가로챘어요.",
            "interview_q2": "사건 당시 어디 계셨나요?",
            "interview_a2": "다른 실험실에서 실험하고 있었어요.",
            "interview_q3": "독극물 보관함 접근 권한이 있죠?",
            "interview_a3": "네, 하지만 모든 연구원이 다 있어요."
        },
        {
            "role": "경쟁 연구원",
            "relationship": "동료",
            "motive_type": "권력",
            "background": "같은 프로젝트 경쟁. 피해자가 승진하면서 관계 악화.",
            "alibi": "집에서 쉬고 있었다고 주장. 증명 불가.",
            "appearance_hint": "흰 가운 없이 평상복 차림. 하지만 손목에 실험실 출입 팔찌가 채워져 있음.",
            "interview_q1": "승진 경쟁에서 밀렸다고 들었는데요?",
            "interview_a1": "억울했죠. 제가 더 자격이 있었는데...",
            "interview_q2": "사건 당일 연구소에 오셨나요?",
            "interview_a2": "아니요, 집에 있었어요.",
            "interview_q3": "출입 기록 시스템 오류에 대해 아시나요?",
            "interview_a3": "모르는 일입니다."
        },
        {
            "role": "연구소 청소원",
            "relationship": "직원",
            "motive_type": "금전",
            "background": "피해자에게 부당 대우 받음. 가족 병원비 필요.",
            "alibi": "청소 중이었다고 주장.",
            "appearance_hint": "청소 유니폼 착용. 고무장갑을 끼고 있으며, 신발이 젖어 있음.",
            "interview_q1": "이 연구원에게 부당한 대우를 받았다고요?",
            "interview_a1": "네... 사람 취급도 안 했어요.",
            "interview_q2": "실험실 열쇠가 있으시죠?",
            "interview_a2": "청소 때문에 필요해요.",
            "interview_q3": "독극물에 대해 아시나요?",
            "interview_a3": "청소하면서 봤지만... 만진 적은 없어요."
        }
    ],
    "고층 빌딩의 추락": [
        {
            "role": "전무이사",
            "relationship": "동생",
            "motive_type": "권력",
            "background": "형제간 경영권 분쟁. 주주총회에서 해임 위기.",
            "alibi": "회의실에서 자료 준비 중이었다고 주장.",
            "appearance_hint": "고급 정장 착용. 넥타이가 약간 풀려 있고, 이마에 땀방울.",
            "interview_q1": "형님과의 관계는 어땠나요?",
            "interview_a1": "가족이지만... 경영 방침이 달랐어요.",
            "interview_q2": "주주총회에서 해임될 뻔했다고요?",
            "interview_a2": "오해가 있었을 뿐입니다.",
            "interview_q3": "사건 당시 어디 계셨나요?",
            "interview_a3": "회의실에서 자료 정리하고 있었어요."
        },
        {
            "role": "비서실장",
            "relationship": "측근",
            "motive_type": "비밀",
            "background": "회장의 비리를 알고 있음. 입막음 위협받음.",
            "alibi": "화장실에 있었다고 주장.",
            "appearance_hint": "단정한 복장. 하지만 손톱을 물어뜯은 흔적이 있고, 눈빛이 불안해 보임.",
            "interview_q1": "회장님의 비리를 알고 계셨나요?",
            "interview_a1": "...그런 건 모릅니다.",
            "interview_q2": "입막음 위협을 받았다는데요?",
            "interview_a2": "누가 그런 말을... 사실이 아닙니다.",
            "interview_q3": "사건 당시 어디 계셨나요?",
            "interview_a3": "화장실에 있었어요."
        },
        {
            "role": "경쟁사 임원",
            "relationship": "사업 경쟁자",
            "motive_type": "금전",
            "background": "인수합병 협상 결렬. 큰 손해 발생.",
            "alibi": "회사에 있었다고 주장. CCTV 확인 가능.",
            "appearance_hint": "정장 차림. 깔끔하고 여유로운 모습. 시계를 자주 확인함.",
            "interview_q1": "인수합병이 무산됐다고요?",
            "interview_a1": "아쉬웠죠. 하지만 사업이 그런 거 아닙니까.",
            "interview_q2": "사건 당일 우진그룹 건물에 오셨나요?",
            "interview_a2": "아니요, 제 회사에 있었어요.",
            "interview_q3": "알리바이를 증명할 수 있나요?",
            "interview_a3": "CCTV 확인하시면 됩니다."
        }
    ]
}

FIRST_NAMES = ["수진", "민호", "지영", "현우", "서연", "준혁", "예은", "동현", "하은", "재민"]
LAST_NAMES = ["이", "박", "최", "정", "강", "조", "윤", "장", "임", "한"]

EVIDENCE_TEMPLATES = {
    "베이지 갤러리의 정전": [
        {
            "name": "깨진 찻잔 조각",
            "description": "집무실 바닥이 아닌 쓰레기통 깊숙한 곳에서 발견. 특이하게도 찻잔의 손잡이 부분만 깨끗하게 닦인 흔적.",
            "location": "집무실 쓰레기통",
            "clue_type": "물리적 증거"
        },
        {
            "name": "배전반의 고무줄",
            "description": "갤러리 지하 배전반에 정전 유도를 위해 설치된 것으로 보이는 끊어진 고무줄과 타버린 퓨즈 발견.",
            "location": "지하 배전실",
            "clue_type": "범행 도구"
        },
        {
            "name": "라텍스 장갑 한 짝",
            "description": "전시관 뒤뜰 쓰레기통에서 발견. 겉면에 미세한 베이지색 유화 물감이 묻어 있음.",
            "location": "뒤뜰 쓰레기통",
            "clue_type": "물리적 증거"
        },
        {
            "name": "수정된 타임라인",
            "description": "보안실 로그 기록 확인 결과, 정전 발생 직전 10분간의 녹화 기록이 삭제되어 있음.",
            "location": "보안실",
            "clue_type": "디지털 증거"
        },
        {
            "name": "열려 있는 창문",
            "description": "집무실은 3층이지만 창문 옆 배수관으로 외부 접근 가능. 창틀에 흙 묻은 신발 자국이 희미하게 남아 있음.",
            "location": "집무실 창문",
            "clue_type": "현장 증거"
        },
        {
            "name": "청산가리 잔여물",
            "description": "찻잔에서 청산가리 성분 검출. 치사량 이상의 농도.",
            "location": "찻잔",
            "clue_type": "독극물"
        }
    ],
    "심야 연구실의 비밀": [
        {
            "name": "주사기",
            "description": "실험대 바닥에 떨어진 주사기. 독극물 잔여물 검출.",
            "location": "실험실 바닥",
            "clue_type": "범행 도구"
        },
        {
            "name": "깨진 시약병",
            "description": "독극물 보관함에서 가져온 것으로 추정. 라벨이 찢어져 있음.",
            "location": "실험실 바닥",
            "clue_type": "물리적 증거"
        },
        {
            "name": "출입 기록 오류",
            "description": "사건 당일 출입 기록 시스템에 오류 발생. 일부 기록 누락.",
            "location": "보안 시스템",
            "clue_type": "디지털 증거"
        },
        {
            "name": "실험 노트",
            "description": "피해자의 실험 노트. 최근 페이지가 찢어진 흔적.",
            "location": "실험대",
            "clue_type": "문서"
        },
        {
            "name": "CCTV 영상",
            "description": "연구소 근처 CCTV에 알리바이 없는 용의자 포착.",
            "location": "외부 CCTV",
            "clue_type": "영상 증거"
        },
        {
            "name": "보관함 열쇠",
            "description": "독극물 보관함 열쇠가 평소와 다른 위치에 있음.",
            "location": "실험실",
            "clue_type": "물리적 증거"
        }
    ],
    "고층 빌딩의 추락": [
        {
            "name": "혈흔이 묻은 트로피",
            "description": "회장실 바닥에서 발견. 피해자의 혈액형과 일치.",
            "location": "회장실",
            "clue_type": "범행 도구"
        },
        {
            "name": "열린 창문",
            "description": "회장실 창문이 활짝 열려 있음. 창틀에 격투 흔적.",
            "location": "회장실 창문",
            "clue_type": "현장 증거"
        },
        {
            "name": "주주총회 자료",
            "description": "책상 위의 주주총회 자료. 특정 임원 해임 안건 포함.",
            "location": "회장실 책상",
            "clue_type": "문서"
        },
        {
            "name": "주차장 CCTV",
            "description": "알리바이를 주장한 용의자의 차량이 주차장에 포착됨.",
            "location": "주차장",
            "clue_type": "영상 증거"
        },
        {
            "name": "비서실 녹음 파일",
            "description": "비서실에서 발견된 녹음기. 회장의 비리 내용 녹음.",
            "location": "비서실",
            "clue_type": "디지털 증거"
        },
        {
            "name": "섬유 조각",
            "description": "회장실에서 발견된 섬유 조각. 용의자 중 한 명의 옷감과 일치 가능성.",
            "location": "회장실",
            "clue_type": "물리적 증거"
        }
    ]
}

TIMES = [
    {"display": "오후 10시 30분", "hour": 22, "minute": 30},
    {"display": "오후 11시 00분", "hour": 23, "minute": 0},
    {"display": "오후 11시 30분", "hour": 23, "minute": 30},
    {"display": "오전 12시 00분", "hour": 0, "minute": 0},
    {"display": "오전 1시 00분", "hour": 1, "minute": 0},
]


def generate_random_scenario() -> Dict:
    """논리적으로 완결된 랜덤 시나리오 생성"""
    
    # 시나리오 선택
    scenario = random.choice(CASE_SCENARIOS)
    case_title = scenario["title"]
    
    # 피해자 정보
    victim = scenario["victim"]
    location = scenario["location"]
    
    # 사망 시간
    time_data = random.choice(TIMES)
    time_of_death = time_data["display"]
    death_hour = time_data["hour"]
    death_minute = time_data["minute"]
    
    # 용의자 3명 생성
    suspect_profiles = SUSPECT_PROFILES[case_title]
    suspects = []
    
    # 범인 선정 (첫 번째 용의자)
    culprit_index = 0
    
    for i, profile in enumerate(suspect_profiles):
        name = random.choice(LAST_NAMES) + random.choice(FIRST_NAMES)
        age = random.randint(28, 55)
        
        is_culprit = (i == culprit_index)
        
        suspect = {
            "id": i,
            "name": name,
            "age": age,
            "role": profile["role"],
            "relationship": profile["relationship"],
            "alibi": profile["alibi"],
            "motive": profile["background"],
            "motive_type": profile["motive_type"],
            "appearance_hint": profile["appearance_hint"],
            "is_culprit": is_culprit,
            "interview": {
                "q1": profile["interview_q1"],
                "a1": profile["interview_a1"],
                "q2": profile["interview_q2"],
                "a2": profile["interview_a2"],
                "q3": profile["interview_q3"],
                "a3": profile["interview_a3"],
            }
        }
        suspects.append(suspect)
    
    culprit = suspects[culprit_index]
    other_suspects = [s for s in suspects if s["name"] != culprit["name"]]
    
    # 증거 생성
    evidence_templates = EVIDENCE_TEMPLATES[case_title]
    evidence_list = []
    
    # 모든 증거를 추가하되, 일부는 범인을, 일부는 다른 용의자를 가리키도록
    for i, evidence_template in enumerate(evidence_templates):
        # 처음 2개는 범인을 가리키는 결정적 증거
        if i < 2:
            points_to = culprit["name"]
            is_decisive = True
        # 다음 2개는 다른 용의자를 가리키는 혼란 증거
        elif i < 4:
            points_to = random.choice(other_suspects)["name"]
            is_decisive = False
        # 나머지는 중립적 증거
        else:
            points_to = "multiple"
            is_decisive = False
        
        evidence = {
            "id": i,
            "name": evidence_template["name"],
            "description": evidence_template["description"],
            "location": evidence_template["location"],
            "clue_type": evidence_template["clue_type"],
            "points_to": points_to,
            "is_decisive": is_decisive,
            "position": {
                "x": random.uniform(-5, 5),
                "y": random.uniform(0.3, 2.5),
                "z": random.uniform(-7, -3)
            }
        }
        evidence_list.append(evidence)
    
    # 솔루션
    solution = {
        "culprit": culprit["name"],
        "motive": culprit["motive_type"],
        "explanation": f"{culprit['name']}은(는) {culprit['role']}로서 {culprit['motive']} "
                      f"이로 인해 범행을 저질렀습니다. {scenario['special_event']}을(를) 이용하여 "
                      f"범행을 은폐하려 했으나, 결정적 증거들이 {culprit['name']}을(를) 가리킵니다.",
        "decisive_evidence": [evidence_list[0]["name"], evidence_list[1]["name"]],
        "red_herrings": [s["name"] for s in other_suspects]
    }
    
    return {
        "case_title": case_title,
        "victim": victim,
        "location": location,
        "time_of_death": time_of_death,
        "cause_of_death": scenario["cause_of_death"],
        "special_event": scenario["special_event"],
        "discovery": scenario["discovery"],
        "suspects": suspects,
        "evidence": evidence_list,
        "solution": solution
    }
    """논리적으로 완결된 랜덤 시나리오 생성"""
    
    # 피해자 선택
    victim = random.choice(VICTIM_POOL).copy()
    
    # 장소 선택
    location = random.choice(LOCATIONS).copy()
    
    # 사망 시간
    time_data = random.choice(TIMES)
    time_of_death = time_data["display"]
    death_hour = time_data["hour"]
    death_minute = time_data["minute"]
    
    # 용의자 3명 선택
    suspect_templates = random.sample(SUSPECT_TEMPLATES, 3)
    suspects = []
    
    # 범인 선정 (첫 번째 용의자)
    culprit_index = 0
    
    for i, template in enumerate(suspect_templates):
        name = random.choice(LAST_NAMES) + random.choice(FIRST_NAMES)
        age = random.randint(28, 55)
        
        is_culprit = (i == culprit_index)
        
        # 알리바이 생성
        if is_culprit:
            alibi = f"사건 시간에 집에 있었다고 주장하나, 목격자나 증거 없음."
        else:
            alibis = [
                f"사건 시간에 친구와 술을 마셨다고 주장. 친구가 증언함.",
                f"사건 시간에 헬스장에 있었다고 주장. CCTV 기록 확인됨.",
                f"사건 시간에 영화관에 있었다고 주장. 티켓 영수증 제시.",
            ]
            alibi = random.choice(alibis)
        
        suspect = {
            "id": i,
            "name": name,
            "age": age,
            "role": template["role"],
            "relationship": template["relationship"],
            "alibi": alibi,
            "motive": template["background"],
            "motive_type": template["motive_type"],
            "is_culprit": is_culprit,
        }
        suspects.append(suspect)
    
    culprit = suspects[culprit_index]
    
    # 증거 생성 (6개)
    evidence_list = []
    
    # === 결정적 증거 2개 (범인만 가리킴) ===
    
    # 1. 범행 도구의 지문
    weapon = random.choice(EVIDENCE_TEMPLATES[0]["items"])
    evidence_list.append({
        "id": 0,
        "name": weapon,
        "type": "weapon",
        "description": f"현장에서 발견된 {weapon}. 혈흔이 묻어있으며 선명한 지문이 발견됨. 지문 데이터베이스 검색 결과 용의자 중 한 명과 일치.",
        "location": f"{location['name']} 바닥",
        "points_to": culprit["name"],
        "clue_type": "fingerprint",
        "is_decisive": True,
        "position": {"x": 1.2, "y": 0.3, "z": -4.5}
    })
    
    # 2. DNA 증거
    trace = random.choice(EVIDENCE_TEMPLATES[3]["items"])
    evidence_list.append({
        "id": 1,
        "name": f"{trace}",
        "type": "trace",
        "description": f"현장에서 발견된 {trace}. 법의학 분석 결과 피해자의 것이 아닌 제3자의 생체 샘플로 확인됨. DNA 프로필 분석 중.",
        "location": "범죄 현장",
        "points_to": culprit["name"],
        "clue_type": "dna",
        "is_decisive": True,
        "position": {"x": 0.5, "y": 0.3, "z": -4}
    })
    
    # === 혼란 증거 2개 (다른 용의자도 의심) ===
    
    # 3. 문서 증거 (여러 용의자 연관)
    document = random.choice(EVIDENCE_TEMPLATES[1]["items"])
    other_suspects = [s for s in suspects if s["name"] != culprit["name"]]
    red_herring_suspect = random.choice(other_suspects)
    
    evidence_list.append({
        "id": 2,
        "name": document,
        "type": "document",
        "description": f"책상 위에 펼쳐진 {document}. '{red_herring_suspect['role']}'과 관련된 민감한 내용이 주로 기록되어 있으나, 다른 직원들의 이름도 일부 언급됨. 특히 재무 관련 문제가 강조되어 있음.",
        "location": "책상 위",
        "points_to": red_herring_suspect["name"],
        "is_decisive": False,
        "position": {"x": -0.5, "y": 1.2, "z": -5}
    })
    
    # 4. 목격 증언 (애매한 정보)
    another_suspect = [s for s in other_suspects if s["name"] != red_herring_suspect["name"]][0]
    evidence_list.append({
        "id": 3,
        "name": "목격자 증언",
        "type": "witness",
        "description": f"건물 경비원의 증언: '{time_of_death} 무렵 {another_suspect['role']} 직책의 누군가가 건물 근처에서 서성이는 것을 봤다. 평소와 다르게 초조해 보였고, 여러 번 시계를 확인했다.'",
        "location": "경비실",
        "points_to": another_suspect["name"],
        "is_decisive": False,
        "position": {"x": -5, "y": 1.5, "z": -6.8}
    })
    
    # === 중립 증거 2개 (여러 해석 가능) ===
    
    # 5. 출입 기록 (여러 명 출입)
    # 범인 입장 시간 계산
    entry_minute = death_minute - random.randint(10, 25)
    entry_hour = death_hour
    if entry_minute < 0:
        entry_minute += 60
        entry_hour -= 1
    
    entry_period = "오후" if entry_hour >= 12 else "오전"
    entry_display_hour = entry_hour if entry_hour <= 12 else entry_hour - 12
    if entry_display_hour == 0:
        entry_display_hour = 12
    entry_time = f"{entry_period} {entry_display_hour}시 {entry_minute}분"
    
    # 범인 외 다른 용의자도 비슷한 시간에 출입
    other_entry_hour = death_hour
    other_entry_minute = death_minute - random.randint(30, 50)
    if other_entry_minute < 0:
        other_entry_minute += 60
        other_entry_hour -= 1
    
    other_entry_period = "오후" if other_entry_hour >= 12 else "오전"
    other_entry_display = other_entry_hour if other_entry_hour <= 12 else other_entry_hour - 12
    if other_entry_display == 0:
        other_entry_display = 12
    other_entry_time = f"{other_entry_period} {other_entry_display}시 {other_entry_minute}분"
    
    evidence_list.append({
        "id": 4,
        "name": "출입 기록",
        "type": "record",
        "description": f"건물 출입 기록: {other_entry_time} {red_herring_suspect['role']} 입장, {entry_time} {culprit['role']} 입장, {other_entry_time} {another_suspect['role']} 입장. 세 명 모두 범행 시간대에 건물 내부에 있었음.",
        "location": "보안 시스템",
        "points_to": "multiple",
        "is_decisive": False,
        "position": {"x": 5, "y": 2.5, "z": -7}
    })
    
    # 6. 디지털 증거 (통화 기록 - 여러 명과 통화)
    digital = random.choice(EVIDENCE_TEMPLATES[2]["items"])
    
    # 사망 15분 전 시간 계산
    before_hour = death_hour
    before_minute = death_minute - 15
    if before_minute < 0:
        before_minute += 60
        before_hour -= 1
    
    if before_hour >= 12:
        time_period = "오후" if before_hour < 24 else "오전"
        display_hour = before_hour if before_hour <= 12 else before_hour - 12
    else:
        time_period = "오전"
        display_hour = before_hour if before_hour > 0 else 12
    
    time_before = f"{time_period} {display_hour}시 {before_minute}분"
    
    # 1시간 전 시간
    hour_before_hour = death_hour - 1
    hour_before_period = "오후" if hour_before_hour >= 12 else "오전"
    hour_before_display = hour_before_hour if hour_before_hour <= 12 else hour_before_hour - 12
    if hour_before_display == 0:
        hour_before_display = 12
    hour_before_time = f"{hour_before_period} {hour_before_display}시 {death_minute}분"
    
    evidence_list.append({
        "id": 5,
        "name": digital,
        "type": "digital",
        "description": f"피해자의 {digital}. 최근 통화 기록: {hour_before_time} {red_herring_suspect['role']}과 10분 통화, {time_before} {culprit['role']}과 3분 통화. 두 통화 모두 격양된 목소리가 들렸다는 주변 증언. 문자 메시지에 '더 이상 참을 수 없다'는 내용.",
        "location": "책상 위",
        "points_to": "multiple",
        "is_decisive": False,
        "position": {"x": 0.3, "y": 1.2, "z": -4.8}
    })
    
    # 솔루션
    solution = {
        "culprit": culprit["name"],
        "motive": culprit["motive_type"],
        "explanation": f"{culprit['name']}은(는) {culprit['motive']} 이로 인해 범행을 저질렀습니다. "
                      f"{weapon}에서 발견된 지문과 DNA 분석 결과가 결정적 증거입니다. "
                      f"다른 용의자들도 의심스러운 정황이 있었으나, 물리적 증거는 {culprit['name']}만을 가리킵니다.",
        "decisive_evidence": ["지문 분석", "DNA 분석"],
        "red_herrings": [red_herring_suspect["name"], another_suspect["name"]]
    }
    
    return {
        "victim": victim,
        "location": location,
        "time_of_death": time_of_death,
        "suspects": suspects,
        "evidence": evidence_list,
        "solution": solution
    }


@app.get("/")
def read_root():
    return {"message": "Mystery Game API"}


@app.get("/api/scenario")
def get_scenario():
    """랜덤 시나리오 생성"""
    return generate_random_scenario()


@app.post("/api/solve")
def check_solution(culprit: str, motive: str, scenario_id: str = "current"):
    """
    정답 확인 (실제로는 프론트엔드에서 검증하지만, 
    추후 멀티플레이어나 점수 시스템을 위해 백엔드에도 구현)
    """
    # 실제 구현에서는 세션별로 시나리오를 저장해야 함
    # 지금은 간단히 프론트엔드에서 검증하도록 함
    return {"message": "Solution checked"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
