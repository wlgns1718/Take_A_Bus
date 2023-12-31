import { createSlice } from "@reduxjs/toolkit";

export type CommentData = {
  id: number;
  boardId: number;
  userId: string;
  content: string;
  createTime: number[];
};

export type LoginData = {
  id: string | null;
  role: string | null;
};

export type BoardData = {
  id: number;
  userId: string;
  title: string;
  content: string;
  createTime: number[];
  sort: string;
  commentResponseDtoList: CommentData[] | null;
};

export type NoticeData = {
  id: number;
  userName: string;
  title: string;
  createTime: number[];
};

export type NoticeDetailData = NoticeData & {
  content: string;
};

export type TripPlace = {
  addr1: string;
  firstimage: string;
  firstimage2: string;
  mapx: number | null;
  mapy: number | null;
  tel: string;
  title: string;
};

export type RouteTripPlace = {
  [key: string]: TripPlace[];
};

export type TripType = {
  code: number;
  text: string;
};

export type Route = {
  endnodenm: string;
  endvehicletime: number;
  routeid: string;
  routeno: string;
  routetp: string;
  startnodenm: string;
  startvehicletime: string;
};
export type SelectInfo = {
  selectedCity: {
    citycode: string;
    cityname: string;
  };
  selectedRoute: Route;
  selectedTripType: TripType;
};

export enum BOARD_KOR {
  REPORT = "신고",
  COMPLAIN = "불만사항",
  COMPLIMENT = "칭찬합니다",
  SUGGESTION = "건의사항",
}
export enum BOARD_ENG {
  "신고" = "REPORT",
  "불만사항" = "COMPLAIN",
  "칭찬합니다" = "COMPLIMENT",
  "건의사항" = "SUGGESTION",
}

export interface WebState {
  selectedBoard: string;
  noticeData: NoticeData[];
  noticeDetailData: NoticeDetailData | null;
  boardData: BoardData[];
  boardDetailData: BoardData;
  Token: string | null;
  selectedNoticeId: number | null;
  selectedPostId: number | null;
  isUserIn: boolean;
  loginData: LoginData | null;
  tripData: RouteTripPlace;
  selectedRecommendInfo: SelectInfo | null;
}

const initialState: WebState = {
  selectedBoard: "공지사항",
  noticeData: [],
  noticeDetailData: null,
  boardData: [],
  boardDetailData: null,
  Token: "",
  selectedNoticeId: null,
  selectedPostId: null,
  isUserIn: false,
  loginData: {
    id: null,
    role: null,
  },
  tripData: {},
  selectedRecommendInfo : null,
};

const webSlice = createSlice({
  name: "web",
  initialState,
  reducers: {
    setIsUserIn(state, action) {
      state.isUserIn = action.payload;
    },
    setToken(state, action) {
      state.Token = action.payload;
    },
    setLoginUser(state, action) {
      state.loginData = action.payload.loginData;
    },
    setLogoutUser(state) {
      state.loginData = {
        id: null,
        role: null,
      };
      state.Token = null;
      state.isUserIn = false;
    },
    changeSelectedBoard(state, action) {
      state.selectedBoard = action.payload;
    },
    changeSelectedNoticeId(state, action) {
      state.selectedNoticeId = action.payload;
    },
    changeSelectedPostId(state, action) {
      state.selectedPostId = action.payload;
    },
    saveBoardData(state, action) {
      state.boardData = action.payload;
    },
    saveNoticeData(state, action) {
      state.noticeData = action.payload;
    },
    saveBoardDetailData(state, action) {
      state.boardDetailData = action.payload;
    },
    saveNoticeDetailData(state, action) {
      state.noticeDetailData = action.payload;
    },
    deleteOneNotice(state, action) {
      const indexToDelete = state.noticeData.findIndex(
        (post) => post.id === action.payload
      );
      if (indexToDelete !== -1) {
        state.noticeData.splice(indexToDelete, 1);
        console.log("delete one");
      }
    },
    deleteOneBoard(state, action) {
      const indexToDelete = state.boardData.findIndex(
        (post) => post.id === action.payload
      );
      if (indexToDelete !== -1) {
        state.boardData.splice(indexToDelete, 1);
        console.log("delete one");
      }
    },
    saveTripData(state, action) {
      state.tripData = action.payload;
    },
    saveRecommendInfo(state, action) {
      state.selectedRecommendInfo = action.payload;
    },
  },
});

export const {
  setIsUserIn,
  changeSelectedBoard,
  changeSelectedNoticeId,
  changeSelectedPostId,
  saveBoardData,
  saveNoticeData,
  saveBoardDetailData,
  saveNoticeDetailData,
  deleteOneNotice,
  deleteOneBoard,
  setToken,
  setLoginUser,
  setLogoutUser,
  saveTripData,
  saveRecommendInfo,
} = webSlice.actions;

export default webSlice;
