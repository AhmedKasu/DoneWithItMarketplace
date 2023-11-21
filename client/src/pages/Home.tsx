import { useState } from 'react';

import Box from '@mui/material/Box';

import { FieldValues } from 'react-hook-form';

import useGetProducts from '../hooks/useGetProducts';
import useGetCategories from '../hooks/useGetCategories';

import { useScreenBreakingPoints } from '../context/screenBreakpoints';

import Products from '../components/Products';
import NoListing from '../components/NoListing';
import SideBar from '../components/SideBar';
import Topbar from '../components/TopBar';

export default function Home() {
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string | undefined>('');

  const { data: products } = useGetProducts(categoryId, searchQuery);
  const { data: categories } = useGetCategories();

  const { isSmallScreen } = useScreenBreakingPoints();

  const handleProductSearch = (variables: FieldValues) => {
    setSearchQuery(variables.search);
  };

  const handleRefetch = () => {
    setSearchQuery('');
    setCategoryId(undefined);
  };

  const showProductsHeader: boolean = searchQuery
    ? false
    : categoryId
    ? false
    : true;

  const isProductsAvailable = products && products.length > 0;

  const smallScreenContent = () => {
    if (categories) {
      return (
        <>
          <Topbar
            handleSearch={handleProductSearch}
            categories={categories}
            handleCategorySelect={(categoryId) => setCategoryId(categoryId)}
          />
          {isProductsAvailable ? (
            <Products products={products} showHeader={showProductsHeader} />
          ) : (
            <NoListing refetch={handleRefetch} />
          )}
        </>
      );
    } else {
      return <NoListing refetch={handleRefetch} />;
    }
  };

  const largeScreenContent = () => {
    if (categories && isProductsAvailable) {
      return <Products products={products} showHeader={showProductsHeader} />;
    } else {
      return <NoListing refetch={handleRefetch} />;
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        display: 'flex',
        backgroundColor: 'appBg.main',
        height: '100vh',
      }}>
      {!isSmallScreen && categories && (
        <SideBar
          categories={categories}
          categoryId={categoryId as number}
          searchQuery={searchQuery as string}
          handleProductSearch={handleProductSearch}
          setCategoryId={setCategoryId}
        />
      )}

      <Box
        sx={{
          pt: { xs: 5, sm: 6 },
          flex: 1,
          overflowY: 'scroll',
          minWidth: { xs: '100vw', md: 'calc(100vw - 360px)' },
        }}>
        {isSmallScreen ? smallScreenContent() : largeScreenContent()}
      </Box>
    </Box>
  );
}
