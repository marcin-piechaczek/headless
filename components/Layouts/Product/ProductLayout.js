import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { resolveImage } from '../../../lib/resolve-image';
import { Price } from '../../Price/Price';
import PRODUCT_QUERY from '../../../queries/products/Product.graphql';
import AddToCartV2 from '../../Buttons/AddToCartV2';

const ProductLayout = ({ filters }) => {
  const { loading, data } = useQuery(PRODUCT_QUERY, { variables: { filters } });

  const product = data?.products.items[0];

  if (loading && !data) return <div>⌚️ Loading...</div>;

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>

      <div className="flex p-5 mt-5">
        <div className="w-1/3">
          {product.media_gallery
            .filter((media) => media.type === 'ProductImage')
            .map((image, index) => (
              <Image
                key={index}
                src={resolveImage(image.url)}
                width={1000}
                height={1240}
                alt={image.label}
              />
            ))}
        </div>
        <div className="">
          <div className="">
            <div className="">
              <h2>{product.name}</h2>

              <div>SKU. {product.sku}</div>

              <Price {...product.price_range} />

              {product.description?.html && (
                <div className="" dangerouslySetInnerHTML={{ __html: product.description.html }} />
              )}
              <div className="">
                <AddToCartV2 product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductLayout;
