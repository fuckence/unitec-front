import { useState, useEffect } from 'react';
import { aituService } from '../features/aitu/aitu-service';
import type { GetMeResult, PhoneResult } from '../features/aitu/aitu-types';

export const useAituUser = () => {
  const [user, setUser] = useState<GetMeResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    aituService
      .getUserInfo()
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, error };
};

export const useAituPhone = () => {
  const [phone, setPhone] = useState<PhoneResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    aituService
      .getPhoneNumber()
      .then(setPhone)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { phone, loading, error };
};

export const useAituData = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    aituService
      .getUserData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};