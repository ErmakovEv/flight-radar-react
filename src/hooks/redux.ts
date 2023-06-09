import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from '../store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
