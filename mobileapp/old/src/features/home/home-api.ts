import { apiClient } from '@/utils/index';

export type Appointment = {
  id: string;
  title: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
};

export async function getAppointments(): Promise<Appointment[]> {
  const { data } = await apiClient.get<Appointment[]>('/appointments');
  return data;
}
