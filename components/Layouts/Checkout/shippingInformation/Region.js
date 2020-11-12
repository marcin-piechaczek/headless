import React, { useEffect, useState } from 'react';
import { Field, useField, useFormikContext } from 'formik';

const Region = ({ name, countries }) => {
  const {
    values: { country_code },
    touched,
    setFieldValue
  } = useFormikContext();

  const [meta] = useField(name);
  const [availableRegions, setAvailableRegions] = useState(null);

  useEffect(() => {
    setFieldValue(name, '');
    if (country_code.trim() !== '' && touched.country_code) {
      const { available_regions } = countries.find((item) => item.id === country_code);
      setAvailableRegions(available_regions);
    }
  }, [countries, country_code, touched.country_code, touched.country_code, setFieldValue, name]);

  return (
    <>
      {availableRegions ? (
        <>
          <div className="mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="region">
              Region
            </label>
            <div className="relative">
              <Field
                autoComplete="none"
                as="select"
                name="region"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="region">
                <option value="" disabled hidden>
                  Select region
                </option>
                {availableRegions.map((region) => (
                  <option key={region.id} value={region.code}>
                    {region.name}
                  </option>
                ))}
              </Field>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="region">
              Region
            </label>
            <Field
              className="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              autoComplete="none"
              name="region"
              id="region"
              placeholder="Region"
            />
            {!!meta.touched && !!meta.error && (
              <p className="text-red-500 text-xs italic">{meta.error}</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Region;
