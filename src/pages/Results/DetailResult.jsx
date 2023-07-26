import React, { useEffect, useState } from "react";
import { useAuth } from '../../hooks/useAuth';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { resultDetail } from "../../redux/detailResultSlice";
import { useSelector } from "react-redux";

export function DetailResult() {
    useBackgroundChanger({ color: '#FFEDAE' })
    const dataSlice = useSelector(resultDetail)
    const resultId = dataSlice.data.id
    
    return(
        <></>
    )
}