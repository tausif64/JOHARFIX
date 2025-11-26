// Button.tsx
import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import tw from 'twrnc';

type Variant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

type Size = 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';

export interface ButtonProps extends TouchableOpacityProps {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  className?: string; // tailwind string
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  textClassName?: string;
}

function cn(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(' ');
}

export const buttonVariants = ({
  variant = 'default',
  size = 'default',
  className = '',
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none';

  const variantMap: Record<Variant, string> = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-500',
    destructive: 'bg-red-600 text-white hover:bg-red-500',
    outline: 'border border-gray-300 bg-transparent',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'bg-transparent hover:bg-gray-100',
    link: 'text-indigo-600 underline-offset-4',
  };

  const sizeMap: Record<Size, string> = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 px-3',
    lg: 'h-10 px-6',
    icon: 'h-9 w-9 p-0',
    'icon-sm': 'h-8 w-8 p-0',
    'icon-lg': 'h-10 w-10 p-0',
  };

  return cn(base, variantMap[variant], sizeMap[size], className);
};

export function Button({
  variant = 'default',
  size = 'default',
  asChild = false,
  className = '',
  children,
  style,
  textClassName = '',
  ...rest
}: ButtonProps) {
  // Build classes and tw styles
  const classes = buttonVariants({ variant, size, className });
  const twStyles = tw`${classes}`;
  const twText = tw`${textClassName}`;

  // Handle asChild: if user passed a single element as child and wants to use it as the root
  if (asChild && children) {
    // Use Children.only then assert the element may have a style prop
    const child = React.Children.only(
      children as React.ReactElement | null,
    ) as React.ReactElement<{ style?: StyleProp<ViewStyle> }> | null;

    if (child && React.isValidElement(child)) {
      const childStyle = child.props?.style ?? null;
      const mergedStyle = [twStyles, childStyle, style].filter(Boolean);
      const childProps = {
        ...rest,
        style: mergedStyle,
      };
      return React.cloneElement(child, childProps);
    }
  }

  // Default rendering as a TouchableOpacity
  return (
    <TouchableOpacity style={[twStyles, style]} {...rest}>
      {typeof children === 'string' ? (
        <Text style={[tw`text-white`, twText]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

export default Button;
