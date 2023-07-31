import { FC } from 'react';
import { BusInfomationPageProps } from '.';
import { Header } from '../../../components/kiosk/Header';
import { ComingSoonBusList } from '../../../components/kiosk/ComingSoonBusList';
import { ArrivalBusList } from '../../../components/kiosk/ArrivalBusList';
import { LivingInformationBox } from '../../../components/kiosk/LivingInfomationBox';
import { BottomButtonBox } from '../../../components/kiosk/BottomButtonBox';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export interface BusData {
  remainingStops: number;
  eta: number;
  routeid: string;
  busNo: string;
  routeType: string;
  vehicleType: string;
  stationOrder: number;
  vehicleNo: string;
  stationId: string;
  stationName: string;
}

export const BusInfomationPage: FC<BusInfomationPageProps> = (props) => {
	const options: object = {
    url: "http://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList",
    method: "GET",
    params: {
      serviceKey:
        "NEAq0nPyhWUnw2Doosd3TUsktCZwBNF3oYydd8r/ow6rBPHHZvs2FwqsW7X4nsepDwS5+ShwmmI/qeorH6py6A==",
      _type: "json",
      cityCode: 25,
      nodeId: "DJB8001793",
    },
  };

	const [data, setData] = useState<BusData[]>([]);

  function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<typeof callback>(callback);

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };

      if (delay !== null) {
        const interval = setInterval(tick, delay);
        return () => clearInterval(interval);
      }
    }, [delay]);
  }

  function updateData() {
    axios(options)
      .then((response) => {
        setData(response.data.response.body.items.item);
        console.log(data);
      });
  }

	useInterval(updateData, 30000)

  return (
    <div {...props}>
      <Header />
      <ComingSoonBusList/>
      <ArrivalBusList data={data} />
      <LivingInformationBox/>
      <BottomButtonBox />
    </div>
  );
};
