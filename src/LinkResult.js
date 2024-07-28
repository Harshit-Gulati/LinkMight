import axios from 'axios';
import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

const ACCESS_TOKEN = 'ed38e3e2c5fcb0e3e30ff57056f1091ca0e0daef';

const LinkResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post('https://api-ssl.bitly.com/v4/shorten', {
        long_url: inputValue
      }, {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
      });
      setShortenLink(response.data.link);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  if (loading) {
    return <p className="text-white text-base">Loading...</p>;
  }
  if (error) {
    return <p className="text-white text-base">Something went wrong :(</p>;
  }

  return (
    <>
      {shortenLink && (
        <div className="flex items-center justify-between p-2">
          <p className="text-white rounded-md border border-primary px-2 py-1 mr-4">{shortenLink}</p>
          <CopyToClipboard
            text={shortenLink}
            onCopy={() => setCopied(true)}
          >
            <button className={`px-2 py-1 text-white cursor-pointer bg-primary rounded-md border-none`}> Copy to Clipboard</button>
          </CopyToClipboard>
        </div >
      )}
    </>
  );
};

export default LinkResult;
